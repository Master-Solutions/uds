import { Context } from 'uds-context';
import TypeDefinition from "../src/TypeDefinition";

describe('TypeDefinition', () => {

  let ctx;

  beforeEach(() => {
    ctx = new Context();
  });

  describe('#constructor', () => {

    it('just id', () => {
      const td = new TypeDefinition(ctx, 'test');
      expect(td.id).toBe('test');
    });

  });


});
