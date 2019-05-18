import TypeDefinition from "./TypeDefinition";

class CollectionTypeDefinition extends TypeDefinition {

  constructor(id, options = {}) {
      super(id, options);

      this.itemType = options.itemType;
  }

}

export default CollectionTypeDefinition;
