/**
 * SALES CRM - PIPELINE MODULE
 * Kanban board stage transitions, stage change history, drag-and-drop, and stage modal
 */

const Pipeline = {
  STAGES: [
    'Cold Calling',
    'New Lead',
    'Contacted',
    'Interested',
    'Prospect',
    'Follow-up',
    'Negotiation',
    'Converted',
    'Not Interested',
    'Lost'
  ],

  getStages() {
    const settings = StorageService.getData(CRM_STORAGE_KEYS.SETTINGS, {});
    let stages = settings.leadStages || this.STAGES;
    if (!stages.includes('Cold Calling')) {
      stages = ['Cold Calling', ...stages];
      if (settings.leadStages) {
        settings.leadStages = stages;
        StorageService.saveData(CRM_STORAGE_KEYS.SETTINGS, settings);
      }
    }
    return stages;
  },

  /**
   * Execute stage change with history recording and activity logging
   */
  changeStage(customerId, toStage, reason = '') {
    const customer = Customers.getById(customerId);
    if (!customer) {
      return { success: false, message: 'Customer not found.' };
    }

    const fromStage = customer.stage;
    if (fromStage === toStage) {
      return { success: true, customer }; // No change
    }

    const currentUser = Auth.getCurrentUser();
    const changedByName = currentUser ? currentUser.name : 'System';
    const now = new Date().toISOString();

    // Map stage to appropriate status
    let newStatus = 'Active';
    if (toStage === 'Converted') newStatus = 'Converted';
    else if (toStage === 'Lost') newStatus = 'Lost';
    else if (toStage === 'Not Interested') newStatus = 'Not Interested';

    // 1. Create stage history record
    const historyId = StorageService.generateId('CRM-STAGE');
    const historyRecord = {
      id: historyId,
      customerId: customer.id,
      customerName: customer.name,
      fromStage: fromStage,
      toStage: toStage,
      changedBy: changedByName,
      changedAt: now,
      reason: reason ? reason.trim() : 'Manual stage transition'
    };

    const historyList = StorageService.getData(CRM_STORAGE_KEYS.STAGE_HISTORY, []);
    historyList.unshift(historyRecord);
    StorageService.saveData(CRM_STORAGE_KEYS.STAGE_HISTORY, historyList);

    // 2. Update customer record
    const updateRes = Customers.update(customerId, {
      stage: toStage,
      status: newStatus
    });

    if (!updateRes.success) return updateRes;

    // 3. Log activity
    Activities.log({
      action: 'Stage Changed',
      customerId: customer.id,
      description: `Stage changed for ${customer.name} from "${fromStage}" to "${toStage}". Reason: ${historyRecord.reason}`
    });

    Toast.success(`Stage updated to ${toStage} for ${customer.name}.`);
    return { success: true, customer: updateRes.customer };
  },

  /**
   * Get stage transition history for a specific customer
   */
  getStageHistory(customerId) {
    if (!customerId) return [];
    const list = StorageService.getData(CRM_STORAGE_KEYS.STAGE_HISTORY, []);
    return list.filter(h => h.customerId === customerId);
  },

  /**
   * Open Stage Change Modal
   */
  openStageModal(customerId, preselectedNewStage = null, onSaved = () => {}) {
    const customer = Customers.getById(customerId);
    if (!customer) {
      Toast.error('Customer not found');
      return;
    }

    let modal = document.getElementById('stage-change-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'stage-change-modal';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal-dialog modal-sm">
          <div class="modal-header">
            <h3 class="modal-title">Change Lead Stage</h3>
            <button class="modal-close-btn" id="stage-modal-close"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Customer</label>
              <input type="text" class="form-control" id="stage-modal-cust-name" disabled>
            </div>
            <div class="form-group">
              <label class="form-label">Current Stage</label>
              <input type="text" class="form-control" id="stage-modal-current-stage" disabled>
            </div>
            <div class="form-group">
              <label class="form-label">New Stage <span class="required">*</span></label>
              <select class="form-select" id="stage-modal-new-stage"></select>
            </div>
            <div class="form-group">
              <label class="form-label">Reason / Notes <span class="required">*</span></label>
              <textarea class="form-control" id="stage-modal-reason" placeholder="Explain why the lead stage is being updated..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="stage-modal-cancel">Cancel</button>
            <button class="btn btn-primary" id="stage-modal-save">Update Stage</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const nameInput = document.getElementById('stage-modal-cust-name');
    const currentInput = document.getElementById('stage-modal-current-stage');
    const newSelect = document.getElementById('stage-modal-new-stage');
    const reasonInput = document.getElementById('stage-modal-reason');
    const saveBtn = document.getElementById('stage-modal-save');
    const cancelBtn = document.getElementById('stage-modal-cancel');
    const closeBtn = document.getElementById('stage-modal-close');

    nameInput.value = `${customer.name} (${customer.id})`;
    currentInput.value = customer.stage;
    reasonInput.value = '';

    // Populate stage options
    newSelect.innerHTML = this.getStages()
      .map(stage => `<option value="${stage}" ${stage === (preselectedNewStage || customer.stage) ? 'selected' : ''}>${stage}</option>`)
      .join('');

    const hide = () => modal.classList.remove('show');

    const handleSave = () => {
      const selectedStage = newSelect.value;
      const reason = reasonInput.value.trim();

      if (!reason) {
        Validation.setError(reasonInput, 'Please provide a reason for the stage transition.');
        return;
      }
      Validation.clearError(reasonInput);

      hide();
      const res = this.changeStage(customerId, selectedStage, reason);
      if (res.success && typeof onSaved === 'function') {
        onSaved(res.customer);
      }
      cleanup();
    };

    const handleCancel = () => {
      hide();
      cleanup();
    };

    const cleanup = () => {
      saveBtn.removeEventListener('click', handleSave);
      cancelBtn.removeEventListener('click', handleCancel);
      closeBtn.removeEventListener('click', handleCancel);
    };

    saveBtn.addEventListener('click', handleSave);
    cancelBtn.addEventListener('click', handleCancel);
    closeBtn.addEventListener('click', handleCancel);

    modal.classList.add('show');
  }
};

window.Pipeline = Pipeline;
