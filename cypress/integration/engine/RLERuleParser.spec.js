import Rule from '../../../docs/BaseTypes/Rule/Rule.js';
import * as RuleParser from '../../../docs/Engine/RLE/RuleParser.js';

describe('Totalistic rule parsing', () => {
  it('should parse canonical notation correctly', () => {
    const conwaylife = new Rule.TotalisticRule([3], [2, 3]);
    const conwaylifeString = 'B3/S23';
    expect(RuleParser.parseTotalisticRule(conwaylifeString))
      .to.deep.equal(conwaylife);
  });

  it('should parse small letter notation correctly', () => {
    const conwaylife = new Rule.TotalisticRule([3], [2, 3]);
    const conwaylifeString = 'b3/s23';
    expect(RuleParser.parseTotalisticRule(conwaylifeString))
      .to.deep.equal(conwaylife);
  });

  it('should parse alternative notation correctly', () => {
    const highlife = new Rule.TotalisticRule([3, 6], [2, 3]);
    const highlifeString = '23/36';
    expect(RuleParser.parseTotalisticRule(highlifeString))
      .to.deep.equal(highlife);
  });

  it('should parse swapped orders correctly', () => {
    const life = new Rule.TotalisticRule([3], [2, 3]);
    const lifeString = 'S23/B3';
    expect(RuleParser.parseTotalisticRule(lifeString))
      .to.deep.equal(life);
  });

  it('should parse multiple numbers correctly', () => {
    const highlife = new Rule.TotalisticRule([3, 6], [2, 3]);
    const highlifeString = 'B36333/S2322';
    expect(RuleParser.parseTotalisticRule(highlifeString))
      .to.deep.equal(highlife);
  });

  it('should fail at incorrect notation', () => {
    const invalidRuleString = 'InvalidRule';
    expect(RuleParser.parseTotalisticRule(invalidRuleString))
      .to.equal(undefined);
  });
});
