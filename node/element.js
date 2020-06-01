function createEditorElement(vm) {
    let dom = null;
    switch(vm.config.type) {
        case 'align':
            dom = this.cretaeAlignElement(vm);
            break;
        case 'select':
            dom = this.createSelectElement(vm);
            break;
        case 'actions':
            dom = this.createActionElement(vm)
            break;
        case 'vue-editor':
            dom = this.createVueEditor(vm);
            break;
        default:
            dom = this.createBasicElement(vm)
    }
    return dom;
}