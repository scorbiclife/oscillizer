import Rule from '../../../docs/BaseTypes/Rule/Rule.js';
import * as RuleParser from '../../../docs/Engine/RLE/RuleParser.js';
import Neighbors from '../../../docs/BaseTypes/Neighbors/Neighbors.js';

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

const { INT } = Neighbors;
const allINTNeighbors = [
  INT.X0,
  INT.X1c, INT.X1e,
  INT.X2c, INT.X2e, INT.X2k, INT.X2a, INT.X2i, INT.X2n,
  INT.X3c, INT.X3e, INT.X3k, INT.X3a, INT.X3i, INT.X3n, INT.X3y, INT.X3q, INT.X3j, INT.X3r,
  INT.X4c, INT.X4e, INT.X4k, INT.X4a, INT.X4i, INT.X4n, INT.X4y, INT.X4q, INT.X4j, INT.X4r,
  INT.X4t, INT.X4w, INT.X4z,
  INT.X5c, INT.X5e, INT.X5k, INT.X5a, INT.X5i, INT.X5n, INT.X5y, INT.X5q, INT.X5j, INT.X5r,
  INT.X6c, INT.X6e, INT.X6k, INT.X6a, INT.X6i, INT.X6n,
  INT.X7c, INT.X7e,
  INT.X8,
];
describe('Isotropic Non-Totalistic rule parser', () => {
  it('should parse basic chars', () => {
    const allNeighborsString = (
      'B01ce2ceakin3ceakinjqry4ceakinjqrywtz5ceakinjqry6ceakin7ce8'
      + '/S01ce2ceakin3ceakinjqry4ceakinjqrywtz5ceakinjqry6ceakin7ce8'
    );
    const expectedRule = new Rule.INTRule(allINTNeighbors, allINTNeighbors);
    const actualRule = RuleParser.parseINTRule(allNeighborsString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse numbers without characters', () => {
    const allNeighborsString = 'B012345678/S012345678';
    const expectedRule = new Rule.INTRule(allINTNeighbors, allINTNeighbors);
    const actualRule = RuleParser.parseINTRule(allNeighborsString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse minus signs', () => {
    const ruleString = (
      'B0-1-ce2-ceakin3-ceakinjqry4-ceakinjqrywtz5-ceakinjqry6-ceakin7-ce8-'
      + '/S0-1-ce2-ceakin3-ceakinjqry4-ceakinjqrywtz5-ceakinjqry6-ceakin7-ce8-'
    );
    const expectedRule = new Rule.INTRule([INT.X0, INT.X8], [INT.X0, INT.X8]);
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should support b/s notation', () => {
    const ruleString = 'b1c/s8';
    const expectedRule = new Rule.INTRule([INT.X1c], [INT.X8]);
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse tlife correctly', () => {
    const ruleString = 'B3/S2-i34q';
    const expectedRule = new Rule.INTRule(
      [INT.X3c, INT.X3e, INT.X3a, INT.X3k, INT.X3i, INT.X3n, INT.X3j, INT.X3q, INT.X3r, INT.X3y],
      [
        INT.X2c, INT.X2e, INT.X2a, INT.X2k, INT.X2n,
        INT.X3c, INT.X3e, INT.X3a, INT.X3k, INT.X3i, INT.X3n, INT.X3j, INT.X3q, INT.X3r, INT.X3y,
        INT.X4q,
      ]
    );
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });
});
