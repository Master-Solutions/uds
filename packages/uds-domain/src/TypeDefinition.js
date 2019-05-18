import { ContextBoundObject } from 'uds-context';

class TypeDefinition extends ContextBoundObject {

  constructor(ctx, id, options = {}) {
    super(ctx);
    this.id = id;
  }

}

export default TypeDefinition;
