import INTRule from '../../../docs/BaseTypes/Rule/INTRule.js';
import TotalisticRule from '../../../docs/BaseTypes/Rule/TotalisticRule.js';
import * as RuleParser from '../../../docs/Engine/RLE/RuleParser.js';

describe('Totalistic rule parsing', () => {
  it('should parse canonical notation correctly', () => {
    const conwaylife = new TotalisticRule([3], [2, 3]);
    const conwaylifeString = 'B3/S23';
    expect(RuleParser.parseTotalisticRule(conwaylifeString))
      .to.deep.equal(conwaylife);
  });

  it('should parse small letter notation correctly', () => {
    const conwaylife = new TotalisticRule([3], [2, 3]);
    const conwaylifeString = 'b3/s23';
    expect(RuleParser.parseTotalisticRule(conwaylifeString))
      .to.deep.equal(conwaylife);
  });

  it('should parse alternative notation correctly', () => {
    const highlife = new TotalisticRule([3, 6], [2, 3]);
    const highlifeString = '23/36';
    expect(RuleParser.parseTotalisticRule(highlifeString))
      .to.deep.equal(highlife);
  });

  it('should parse swapped orders correctly', () => {
    const life = new TotalisticRule([3], [2, 3]);
    const lifeString = 'S23/B3';
    expect(RuleParser.parseTotalisticRule(lifeString))
      .to.deep.equal(life);
  });

  it('should parse multiple numbers correctly', () => {
    const highlife = new TotalisticRule([3, 6], [2, 3]);
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

const allINTNeighbors = [
  '0',
  '1c', '1e',
  '2c', '2e', '2k', '2a', '2i', '2n',
  '3c', '3e', '3k', '3a', '3i', '3n', '3y', '3q', '3j', '3r',
  '4c', '4e', '4k', '4a', '4i', '4n', '4y', '4q', '4j', '4r', '4t', '4w', '4z',
  '5c', '5e', '5k', '5a', '5i', '5n', '5y', '5q', '5j', '5r',
  '6c', '6e', '6k', '6a', '6i', '6n',
  '7c', '7e',
  '8',
];
describe('Isotropic Non-Totalistic rule parser', () => {
  it('should parse basic chars', () => {
    const allNeighborsString = (
      'B01ce2ceakin3ceakinjqry4ceakinjqrywtz5ceakinjqry6ceakin7ce8'
      + '/S01ce2ceakin3ceakinjqry4ceakinjqrywtz5ceakinjqry6ceakin7ce8'
    );
    const expectedRule = new INTRule(allINTNeighbors, allINTNeighbors);
    const actualRule = RuleParser.parseINTRule(allNeighborsString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse numbers without characters', () => {
    const allNeighborsString = 'B012345678/S012345678';
    const expectedRule = new INTRule(allINTNeighbors, allINTNeighbors);
    const actualRule = RuleParser.parseINTRule(allNeighborsString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse minus signs', () => {
    const ruleString = (
      'B0-1-ce2-ceakin3-ceakinjqry4-ceakinjqrywtz5-ceakinjqry6-ceakin7-ce8-'
      + '/S0-1-ce2-ceakin3-ceakinjqry4-ceakinjqrywtz5-ceakinjqry6-ceakin7-ce8-'
    );
    const expectedRule = new INTRule(['0', '8'], ['0', '8']);
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should support b/s notation', () => {
    const ruleString = 'b1c/s8';
    const expectedRule = new INTRule(['1c'], ['8']);
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });

  it('should parse tlife correctly', () => {
    const ruleString = 'B3/S2-i34q';
    const expectedRule = new INTRule(
      [
        '3c', '3e', '3a', '3k', '3i', '3n', '3j', '3q', '3r', '3y',
      ],
      [
        '2c', '2e', '2a', '2k', '2n',
        '3c', '3e', '3a', '3k', '3i', '3n', '3j', '3q', '3r', '3y',
        '4q',
      ]
    );
    const actualRule = RuleParser.parseINTRule(ruleString);
    expect(actualRule.births).to.have.deep.members(expectedRule.births);
    expect(actualRule.survivals).to.have.deep.members(expectedRule.survivals);
  });
});
