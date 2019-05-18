import TypeDefinition from "./TypeDefinition";

class EntityTypeDefinition extends TypeDefinition {

  constructor(id, options = {}) {
      super(id, options);

      this.fields = {};
  }

  addField(field) {
    this.fields[field.id] = field;
  }

}

export default EntityTypeDefinition;
