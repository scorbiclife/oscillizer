(() => {
  // src/MVC/Models/AppState.ts
  var AppState = class {
    constructor(value, eventTarget) {
      this.eventTarget = eventTarget || new EventTarget();
      this.value = value;
    }
    setValue(newValue) {
      this.value = newValue;
      this.eventTarget.dispatchEvent(new CustomEvent("change", { detail: { source: this } }));
    }
  };
  var AppState_default = AppState;

  // src/MVC/Controllers/PassingController/EventTargetPassingController.ts
  var EventTargetPassingController = class {
    constructor(targetState) {
      this.targetState = targetState;
      this.update = (event) => {
        if (!event.target) {
          return;
        }
        this.targetState.setValue(event.target.value);
      };
    }
  };
  var EventTargetPassingController_default = EventTargetPassingController;

  // src/Engine/RLE/PatternParser.ts
  var PatternParser = class {
    constructor(initialState = {}) {
      this.isFinished = initialState.isFinished || false;
      this.cells = initialState.cells || [];
      this.runCount = initialState.runCount || 0;
      this.currentCell = initialState.currentCell || [0, 0];
    }
    finishParsing() {
      this.isFinished = true;
    }
    addNewlines() {
      const [, y] = this.currentCell;
      const runCount = this.runCount || 1;
      this.currentCell = [0, y + runCount];
      this.runCount = 0;
    }
    updateRunCount(digit) {
      this.runCount = this.runCount * 10 + digit;
    }
    drawRun(cellState) {
      const [x, y] = this.currentCell;
      const runCount = this.runCount || 1;
      const newCells = new Array(runCount).fill(0).map((v, i) => [x + i, y]);
      const addNewCells = (nc, s) => {
        if (s) {
          this.cells = this.cells.concat(nc);
        }
      };
      addNewCells(newCells, cellState);
      this.currentCell = [x + runCount, y];
      this.runCount = 0;
    }
  };
  var PatternParser_default = PatternParser;

  // src/BaseTypes/Rule/INTRule.ts
  var INTRule = class {
    constructor(births, survivals) {
      this.births = births;
      this.survivals = survivals;
    }
  };
  var INTRule_default = INTRule;

  // src/BaseTypes/Rule/TotalisticRule.ts
  var TotalisticRule = class {
    constructor(births, survivals) {
      this.births = births;
      this.survivals = survivals;
    }
  };
  var TotalisticRule_default = TotalisticRule;

  // src/Engine/RLE/RuleParser.ts
  var parseTotalisticRule = (ruleString) => {
    const updateState = (state, char) => {
      if (!state.success) {
        return state;
      }
      const {
        success,
        births: births2,
        survivals: survivals2,
        isBirth
      } = state;
      switch (char) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          (isBirth ? births2 : survivals2).push(parseInt(char, 10));
          return {
            success,
            births: births2,
            survivals: survivals2,
            isBirth
          };
        case "b":
        case "B":
          return {
            success,
            births: births2,
            survivals: survivals2,
            isBirth: true
          };
        case "s":
        case "S":
          return {
            success,
            births: births2,
            survivals: survivals2,
            isBirth: false
          };
        case "/":
          return {
            success,
            births: births2,
            survivals: survivals2,
            isBirth: !isBirth
          };
        default:
          return {
            success: false,
            births: [],
            survivals: [],
            isBirth: false
          };
      }
    };
    const finalState = Array.from(ruleString).reduce(updateState, {
      success: true,
      births: [],
      survivals: [],
      isBirth: false
    });
    if (!finalState.success) {
      return void 0;
    }
    const births = [...new Set(finalState.births).keys()];
    const survivals = [...new Set(finalState.survivals).keys()];
    return new TotalisticRule_default(births, survivals);
  };
  var parseINTRule = (ruleString) => {
    const copyWithBirth = (state) => ({
      isBirth: true,
      births: state.births,
      survivals: state.survivals
    });
    const copyWithSurvival = (state) => ({
      isBirth: false,
      births: state.births,
      survivals: state.survivals
    });
    const copyWithToggledBirth = (state) => ({
      isBirth: !state.isBirth,
      births: state.births,
      survivals: state.survivals
    });
    const allNeighborsByCount = [
      [
        "0"
      ],
      [
        "1c",
        "1e"
      ],
      [
        "2c",
        "2e",
        "2a",
        "2k",
        "2i",
        "2n"
      ],
      [
        "3c",
        "3e",
        "3a",
        "3k",
        "3i",
        "3n",
        "3j",
        "3q",
        "3r",
        "3y"
      ],
      [
        "4c",
        "4e",
        "4a",
        "4k",
        "4i",
        "4n",
        "4j",
        "4q",
        "4r",
        "4y",
        "4t",
        "4w",
        "4z"
      ],
      [
        "5c",
        "5e",
        "5a",
        "5k",
        "5i",
        "5n",
        "5j",
        "5q",
        "5r",
        "5y"
      ],
      [
        "6c",
        "6e",
        "6a",
        "6k",
        "6i",
        "6n"
      ],
      [
        "7c",
        "7e"
      ],
      [
        "8"
      ]
    ];
    const neighborsByCountAndChar = [
      new Map(),
      new Map([
        ["c", "1c"],
        ["e", "1e"]
      ]),
      new Map([
        ["c", "2c"],
        ["e", "2e"],
        ["a", "2a"],
        ["k", "2k"],
        ["i", "2i"],
        ["n", "2n"]
      ]),
      new Map([
        ["c", "3c"],
        ["e", "3e"],
        ["a", "3a"],
        ["k", "3k"],
        ["i", "3i"],
        ["n", "3n"],
        ["j", "3j"],
        ["q", "3q"],
        ["r", "3r"],
        ["y", "3y"]
      ]),
      new Map([
        ["c", "4c"],
        ["e", "4e"],
        ["a", "4a"],
        ["k", "4k"],
        ["i", "4i"],
        ["n", "4n"],
        ["j", "4j"],
        ["q", "4q"],
        ["r", "4r"],
        ["y", "4y"],
        ["w", "4w"],
        ["t", "4t"],
        ["z", "4z"]
      ]),
      new Map([
        ["c", "5c"],
        ["e", "5e"],
        ["a", "5a"],
        ["k", "5k"],
        ["i", "5i"],
        ["n", "5n"],
        ["j", "5j"],
        ["q", "5q"],
        ["r", "5r"],
        ["y", "5y"]
      ]),
      new Map([
        ["c", "6c"],
        ["e", "6e"],
        ["a", "6a"],
        ["k", "6k"],
        ["i", "6i"],
        ["n", "6n"]
      ]),
      new Map([
        ["c", "7c"],
        ["e", "7e"]
      ]),
      new Map()
    ];
    const getNeighborsFromWord = (word) => {
      const neighborSet = new Set();
      const count = parseInt(word[0], 10);
      const [birthsString, ...survivalsStrings] = word.slice(1).split("-");
      if (birthsString === "") {
        allNeighborsByCount[count].forEach((n) => neighborSet.add(n));
      } else {
        Array.from(birthsString).forEach((c) => neighborSet.add(neighborsByCountAndChar[count].get(c)));
      }
      Array.from(survivalsStrings.join("")).forEach((c) => neighborSet.delete(neighborsByCountAndChar[count].get(c)));
      return neighborSet;
    };
    const initialState = {
      isBirth: false,
      births: new Set(),
      survivals: new Set()
    };
    const words = ruleString.match(/[bBsS/]|[0-8][-cekainyqjrtwz]*/g);
    if (words.reduce((psum, w) => psum + w.length, 0) !== ruleString.length) {
      return void 0;
    }
    const finalState = words.reduce((state, word) => {
      if (word === "b" || word === "B") {
        return copyWithBirth(state);
      }
      if (word === "s" || word === "S") {
        return copyWithSurvival(state);
      }
      if (word === "/") {
        return copyWithToggledBirth(state);
      }
      const neighborsSet = getNeighborsFromWord(word);
      const targetSet = state.isBirth ? state.births : state.survivals;
      neighborsSet.forEach((n) => targetSet.add(n));
      return state;
    }, initialState);
    return new INTRule_default([...finalState.births], [...finalState.survivals]);
  };

  // src/MVC/Controllers/OscStatsController/RLEHelpers.ts
  var mapStateFromChar = new Map([
    [".", 0],
    ["A", 1],
    ["B", 0],
    ["C", 1],
    ["D", 0],
    ["E", 1],
    ["F", 0],
    ["b", 0],
    ["o", 1]
  ]);
  var updateParserState = (parserState, c) => {
    if (parserState.isFinished) {
      return parserState;
    }
    if (c === "!") {
      parserState.finishParsing();
      return parserState;
    }
    if (c >= "0" && c <= "9") {
      const d = c.charCodeAt(0) - "0".charCodeAt(0);
      parserState.updateRunCount(d);
      return parserState;
    }
    if (c === "$") {
      parserState.addNewlines();
      return parserState;
    }
    const currState = mapStateFromChar.get(c) || 0;
    parserState.drawRun(currState);
    return parserState;
  };
  var parseBody = (rleBodyString) => {
    const parseResult = [...rleBodyString].reduce(updateParserState, new PatternParser_default());
    parseResult.finishParsing();
    return parseResult.cells;
  };
  var extractParts = (rleString) => {
    const lines = rleString.split("\n").map((line) => line.replace(/\s/g, "")).filter((line) => line !== "");
    const isNotComment = (line) => !line.startsWith("#");
    const firstNonCommentIndex = lines.findIndex(isNotComment);
    const headerRegex = /^x=\d+,y=\d+,rule=(.*)/;
    const matchedHeader = headerRegex.exec(lines[firstNonCommentIndex]);
    const bodyStartIndex = firstNonCommentIndex + (matchedHeader !== null ? 1 : 0);
    const body = lines.slice(bodyStartIndex).join("");
    const rule = matchedHeader ? matchedHeader[1] : null;
    return { body, rule };
  };
  var parse = (rleString) => {
    const { rule: ruleString, body } = extractParts(rleString);
    const pattern = parseBody(body);
    const rule = parseTotalisticRule(ruleString) || parseINTRule(ruleString) || void 0;
    return { pattern, rule };
  };

  // src/BaseTypes/BoundingBox.ts
  var BoundingBox = class {
    constructor(xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity) {
      this.xmin = xmin;
      this.xmax = xmax;
      this.ymin = ymin;
      this.ymax = ymax;
    }
    plus(other) {
      const xmin = Math.min(this.xmin, other.xmin);
      const xmax = Math.max(this.xmax, other.xmax);
      const ymin = Math.min(this.ymin, other.ymin);
      const ymax = Math.max(this.ymax, other.ymax);
      return new BoundingBox(xmin, xmax, ymin, ymax);
    }
    static sum(boxes) {
      return boxes.reduce((psum, box) => psum.plus(box), new BoundingBox());
    }
  };
  var BoundingBox_default = BoundingBox;

  // src/BaseTypes/CellMap.ts
  var cellToString = (x, y) => `${x} ${y}`;
  var stringToCell = (s) => s.split(" ").map((e) => parseInt(e, 10));
  var CellMap = class {
    constructor(entries = []) {
      this.map = new Map();
      entries.forEach(([x, y], value) => this.set([x, y], value));
    }
    static fromKeys(keys) {
      const map = new CellMap();
      keys.forEach(([x, y]) => map.set([x, y], null));
      return map;
    }
    static fromEntries(entries) {
      return new CellMap(entries);
    }
    has(key) {
      const [x, y] = key;
      return this.map.has(cellToString(x, y));
    }
    get(key, defaultValue) {
      const [x, y] = key;
      const value = this.map.get(cellToString(x, y));
      return value !== void 0 ? value : defaultValue;
    }
    set(key, value) {
      const [x, y] = key;
      this.map.set(cellToString(x, y), value);
    }
    get size() {
      return this.map.size;
    }
    keys() {
      return [...this.map.keys()].map(stringToCell);
    }
    entries() {
      return [...this.map.entries()].map(([s, v]) => [stringToCell(s), v]);
    }
  };
  var CellMap_default = CellMap;

  // src/MVC/Controllers/OscStatsController/OscHelpers.ts
  var getPhases = (board, maxGens = 1e3) => {
    const haveSameMembers = (array, set) => array.length === set.size && array.every((cell) => set.has(cell));
    const appendNextBoard = ({ result, lastBoards, initialCellsSet }) => {
      if (result.length !== 0) {
        return { result, lastBoards, initialCellsSet };
      }
      const lastBoard = lastBoards[lastBoards.length - 1];
      const currBoard = lastBoard.after();
      if (haveSameMembers(currBoard.getCells(), initialCellsSet)) {
        return {
          result: lastBoards,
          lastBoards: [],
          initialCellsSet
        };
      }
      return {
        result: [],
        lastBoards: lastBoards.concat(currBoard),
        initialCellsSet
      };
    };
    const repeatForMaxGens = new Array(maxGens).fill();
    const initialData = {
      result: [],
      lastBoards: [board],
      initialCellsSet: CellMap_default.fromKeys(board.getCells())
    };
    const phases = repeatForMaxGens.reduce(appendNextBoard, initialData).result;
    return phases;
  };
  var getSubperiodByCell = (oscPhaseBoards) => {
    const getAliveGensByCell = (phases) => {
      const phasesSet = phases.map(CellMap_default.fromKeys);
      const allCells = CellMap_default.fromKeys([].concat(...phases)).keys();
      const gens = phases.map((_, gen) => gen);
      return allCells.map((cell) => ({
        cell,
        aliveGens: gens.filter((gen) => phasesSet[gen].has(cell))
      }));
    };
    const getSubperiodOfOneCell = (aliveGens, period2) => {
      const aliveGensSet = new Set(aliveGens);
      const subperiods = new Array(period2).fill().map((_, i) => i + 1).filter((n) => period2 % n === 0);
      const isSubperiodValid = (n) => aliveGens.map((g) => (g + n) % period2).every((g) => aliveGensSet.has(g));
      const validSubperiods = subperiods.filter(isSubperiodValid);
      return Math.min(...validSubperiods);
    };
    const period = oscPhaseBoards.length;
    const result = getAliveGensByCell(oscPhaseBoards.map((b) => b.getCells())).map(({ cell, aliveGens }) => ({
      cell,
      subperiod: getSubperiodOfOneCell(aliveGens, period)
    }));
    return result;
  };
  var getOscStats = (board) => {
    const getAverage = (l) => l.reduce((a, b) => a + b, 0) / l.length;
    const formatFloat = (f) => f.toFixed(2);
    const formatPercentage = (f) => `${(100 * f).toFixed(2)}%`;
    const getRotorCount = (subperiods2) => subperiods2.filter(({ subperiod }) => subperiod !== 1).length;
    const getStrictRotorCount = (subperiods2, period2) => subperiods2.filter(({ subperiod }) => subperiod === period2).length;
    const getVolatility = (subperiods2) => getRotorCount(subperiods2) / subperiods2.length;
    const getStrictVolatility = (subperiods2, period2) => getStrictRotorCount(subperiods2, period2) / subperiods2.length;
    const phaseBoards = getPhases(board);
    const period = phaseBoards.length;
    if (period === 0) {
      return {
        success: false,
        message: "Failed to detect period of pattern"
      };
    }
    const populations = phaseBoards.map((b) => b.getPop());
    const subperiods = getSubperiodByCell(phaseBoards);
    const result = {
      success: true,
      pattern: board.getCells(),
      period,
      phases: phaseBoards.map((p) => p.getCells()),
      subperiods,
      minPop: Math.min(...populations),
      maxPop: Math.max(...populations),
      avgPop: formatFloat(getAverage(populations)),
      numCells: subperiods.length,
      numRotorCells: getRotorCount(subperiods),
      numStatorCells: subperiods.length - getRotorCount(subperiods),
      numStrictRotorCells: getStrictRotorCount(subperiods, period),
      volatility: formatPercentage(getVolatility(subperiods)),
      strictVolatility: formatPercentage(getStrictVolatility(subperiods, period)),
      boundingBox: BoundingBox_default.sum(phaseBoards.map((p) => p.getBox()))
    };
    return result;
  };

  // src/Engine/Board/SimpleBoard/AbcSimpleBoard.ts
  var AbcSimpleBoard = class {
    constructor(pattern, rule, gen) {
      this.pattern = pattern;
      this.rule = rule;
      this.gen = gen;
      this.transitionFunction = void 0;
    }
    getCells() {
      return this.pattern;
    }
    getCellsAndStates() {
      return this.pattern.map((cell) => [cell, 1]);
    }
    getBox() {
      return BoundingBox_default.sum(this.pattern.map(([x, y]) => new BoundingBox_default(x, x, y, y)));
    }
    getPop() {
      return this.pattern.length;
    }
    after(gens = 1) {
      const repeatForGens = new Array(gens).fill();
      const transFunc = this.transitionFunction;
      const iteratedPattern = repeatForGens.reduce(transFunc, this.pattern);
      const ThisClass = this.constructor;
      return new ThisClass(iteratedPattern, this.rule, this.gen + gens);
    }
  };
  var AbcSimpleBoard_default = AbcSimpleBoard;

  // src/Engine/Board/SimpleBoard/SimpleTotalisticBoard.ts
  var moore = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];
  var getNeighborCounts = (cellsArray, neighbors) => {
    const neighborCountsMap = new CellMap_default();
    cellsArray.forEach(([x, y]) => {
      neighbors.forEach(([dx, dy]) => {
        const targetCell = [x + dx, y + dy];
        const count = neighborCountsMap.get(targetCell) || 0;
        neighborCountsMap.set(targetCell, count + 1);
      });
    });
    return neighborCountsMap;
  };
  var makeTransFromTotalisticRule = (totalisticRule) => (cellsArray) => {
    const { births, survivals } = totalisticRule;
    const neighborCounts = getNeighborCounts(cellsArray, moore);
    const cellsSet = CellMap_default.fromKeys(cellsArray);
    const ruleCondition = ([cell, count]) => cellsSet.has(cell) ? survivals.includes(count - 1) : births.includes(count);
    return [...neighborCounts.entries()].filter(ruleCondition).map(([cell]) => cell);
  };
  var SimpleTotalisticBoard = class extends AbcSimpleBoard_default {
    constructor(pattern, rule, gen = 0) {
      super(pattern, rule, gen);
      this.transitionFunction = makeTransFromTotalisticRule(rule);
    }
  };
  var SimpleTotalisticBoard_default = SimpleTotalisticBoard;

  // src/BaseTypes/Neighbors/INTNeighbors.ts
  var intNeighborsByIndex = `
    0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
    0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
    1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
    1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
    1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
    1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
    2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
    2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
    1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
    1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
    2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
    2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
    2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
    2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
    3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
    3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
    1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
    1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
    2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
    2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
    2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
    2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
    3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
    3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
    2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
    2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
    3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
    3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
    3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
    3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
    4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
    4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
  `.trim().split(/\s+/);

  // src/Engine/Board/SimpleBoard/SimpleINTBoard.ts
  var weightsByRelPos = new Map([
    [[-1, -1], 1],
    [[-1, 0], 2],
    [[-1, 1], 4],
    [[0, -1], 8],
    [[0, 0], 16],
    [[0, 1], 32],
    [[1, -1], 64],
    [[1, 0], 128],
    [[1, 1], 256]
  ]);
  var getNeighborTransitionIndexes = (cellsArray) => {
    const neighborTransitions = new CellMap_default();
    cellsArray.forEach(([x, y]) => {
      weightsByRelPos.forEach((w, [dx, dy]) => {
        const targetCell = [x - dx, y - dy];
        const currentWeight = neighborTransitions.get(targetCell) || 0;
        neighborTransitions.set(targetCell, currentWeight + w);
      });
    });
    return neighborTransitions;
  };
  var makeTransitionFunction = (rule) => (cellsArray) => {
    const transitionIndexesByCell = getNeighborTransitionIndexes(cellsArray);
    const nextCells = [...transitionIndexesByCell.entries()].filter(([, tIndex]) => {
      const cellIsAlive = (tIndex & 16) !== 0;
      const validTransitions = cellIsAlive ? rule.survivals : rule.births;
      return validTransitions.includes(intNeighborsByIndex[tIndex]);
    }).map(([cell]) => cell);
    return nextCells;
  };
  var SimpleINTBoard = class extends AbcSimpleBoard_default {
    constructor(pattern, rule, gen = 0) {
      super(pattern, rule, gen);
      this.transitionFunction = makeTransitionFunction(rule);
    }
  };
  var SimpleINTBoard_default = SimpleINTBoard;

  // src/AppConfig.ts
  var life = new TotalisticRule_default([3], [2, 3]);
  var makeBoard = (pattern, rule = life) => {
    if (rule.constructor === TotalisticRule_default) {
      return new SimpleTotalisticBoard_default(pattern, rule);
    }
    if (rule.constructor === INTRule_default) {
      return new SimpleINTBoard_default(pattern, rule);
    }
    throw new Error("Invalid Rule!");
  };

  // src/MVC/Controllers/OscStatsController/OscStatsController.ts
  var OscStatsController = class {
    constructor(targetState, sourceElement) {
      this.targetState = targetState;
      this.sourceElement = sourceElement;
      this.update = (event) => {
        if (!event.target) {
          this.targetState.setValue({
            success: false,
            message: "No event.target"
          });
          return;
        }
        const rleString = this.sourceElement.value;
        const { pattern, rule } = parse(rleString);
        if (!rule) {
          this.targetState.setValue({
            success: false,
            message: "Unable to parse rule"
          });
          return;
        }
        const initialBoard = makeBoard(pattern, rule);
        this.targetState.setValue(getOscStats(initialBoard));
      };
    }
  };
  var OscStatsController_default = OscStatsController;

  // src/MVC/Views/OscillizerCanvasView/CanvasHelpers.ts
  var colorscheme = {
    background: "#eeeeee",
    stator: "#000000",
    strictRotor: "#999999",
    liveCell: "#000000"
  };
  var cellSizes = {
    cell: 10,
    border: 1,
    liveCell: 4,
    liveBorder: 2
  };
  var makeGradientColor = (numColors, i) => {
    const hue = Math.floor(360 * (i / numColors));
    return `hsl(${hue}, 100%, 70%)`;
  };
  var makeColorMap = (period, subperiods) => {
    const subperiodsSet = new Set(subperiods);
    subperiodsSet.delete(1);
    subperiodsSet.delete(period);
    const nonSpecialSubperiods = [...subperiodsSet.values()].sort((a, b) => a - b);
    const nonSpecialSubperiodsAndColors = nonSpecialSubperiods.map((sp, i) => [sp, makeGradientColor(nonSpecialSubperiods.length, i)]);
    return new Map([
      ...nonSpecialSubperiodsAndColors,
      [1, colorscheme.stator],
      [period, colorscheme.strictRotor]
    ]);
  };
  var drawGrid = (canvas, context, boundingBox) => {
    const { cell: cellSize, border: borderWidth } = cellSizes;
    const patternWidth = boundingBox.xmax - boundingBox.xmin + 1;
    const patternHeight = boundingBox.ymax - boundingBox.ymin + 1;
    canvas.width = cellSize * (patternWidth + 2);
    canvas.height = cellSize * (patternHeight + 2);
    context.fillStyle = colorscheme.background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    new Array(patternHeight + 2).fill().forEach((_, i) => {
      context.fillRect(0, cellSize * i, canvas.width, borderWidth);
      context.fillRect(0, cellSize * (i + 1) - borderWidth, canvas.width, borderWidth);
    });
    new Array(patternWidth + 2).fill().forEach((_, i) => {
      context.fillRect(cellSize * i, 0, canvas.height, borderWidth);
      context.fillRect(cellSize * (i + 1) - borderWidth, 0, borderWidth, canvas.height);
    });
  };
  var drawCell = (context, x, y, color) => {
    context.fillStyle = color;
    const cellSize = cellSizes.cell;
    const borderWidth = cellSizes.border;
    const rect = [
      (x + 1) * cellSize + borderWidth,
      (y + 1) * cellSize + borderWidth,
      cellSize - 2 * borderWidth,
      cellSize - 2 * borderWidth
    ];
    context.fillRect(...rect);
  };
  var drawLiveCellInterior = (context, x, y) => {
    context.fillStyle = colorscheme.liveCell;
    const { cell: cellSize, liveCell: liveCellSize } = cellSizes;
    const rect = [
      (x + 1) * cellSize + 0.5 * (cellSize - liveCellSize),
      (y + 1) * cellSize + 0.5 * (cellSize - liveCellSize),
      liveCellSize,
      liveCellSize
    ];
    context.fillRect(...rect);
  };
  var drawLiveCellBorder = (context, x, y) => {
    context.fillStyle = colorscheme.liveCell;
    const {
      cell: cellSize,
      border: borderWidth,
      liveBorder: liveBorderWidth
    } = cellSizes;
    const xLeft = (x + 1) * cellSize + borderWidth;
    const xRight = (x + 2) * cellSize - borderWidth - liveBorderWidth;
    const yTop = (y + 1) * cellSize + borderWidth;
    const yBottom = (y + 2) * cellSize - borderWidth - liveBorderWidth;
    const liveBorderLength = cellSize - 2 * borderWidth;
    context.fillRect(xLeft, yTop, liveBorderLength, liveBorderWidth);
    context.fillRect(xLeft, yBottom, liveBorderLength, liveBorderWidth);
    context.fillRect(xLeft, yTop, liveBorderWidth, liveBorderLength);
    context.fillRect(xRight, yTop, liveBorderWidth, liveBorderLength);
  };

  // src/MVC/Views/OscillizerCanvasView/OscillizerCanvasView.ts
  var drawLiveCellOptions = new Map([
    ["none", () => {
    }],
    ["border", drawLiveCellBorder],
    ["interior", drawLiveCellInterior]
  ]);
  var getArrayFromSubperiods = (subperiods) => {
    const subperiodSet = new Set(subperiods.map((e) => e.subperiod));
    const subperiodArray = [...subperiodSet.values()].sort((a, b) => a - b);
    return subperiodArray;
  };
  var OscillizerCanvasView = class {
    constructor(oscData, cellStyle, targetCanvas) {
      this.oscData = oscData;
      this.cellStyle = cellStyle;
      this.targetCanvas = targetCanvas;
      this.update = () => {
        const context = this.targetCanvas.getContext("2d");
        if (!context) {
          return;
        }
        const {
          success,
          pattern,
          period,
          subperiods,
          boundingBox
        } = this.oscData.value;
        const colorMap = makeColorMap(period, getArrayFromSubperiods(subperiods));
        const drawSubperiod = ({ cell: [x, y], subperiod }) => {
          drawCell(context, x - boundingBox.xmin, y - boundingBox.ymin, colorMap.get(subperiod));
        };
        const drawLiveCell = ([x, y]) => {
          const drawLiveCellOption = drawLiveCellOptions.get(this.cellStyle.value || "none");
          drawLiveCellOption(context, x - boundingBox.xmin, y - boundingBox.ymin);
        };
        context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        if (!success) {
          return;
        }
        drawGrid(targetCanvas, context, boundingBox);
        subperiods.forEach(drawSubperiod);
        pattern.forEach(drawLiveCell);
      };
    }
  };
  var OscillizerCanvasView_default = OscillizerCanvasView;

  // src/MVC/Views/OscStatsView/OscStatsView.ts
  var OscStatsView = class {
    constructor(sourceState, targetElement) {
      this.sourceState = sourceState;
      this.targetElement = targetElement;
      this.update = () => {
        const data = this.sourceState.value;
        if (!data.success) {
          this.targetElement.innerText = `Failure: ${data.message}`;
        } else {
          this.targetElement.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr class="stripe-dark">
                <td>Period</td>
                <td>${data.period}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Population</td>
                <td>Avg: ${data.avgPop}<br>Min: ${data.minPop}<br>Max: ${data.maxPop}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Cells</td>
                <td>
                  Rotor: ${data.numRotorCells}<br>
                  Stator: ${data.numStatorCells}<br>
                  Total: ${data.numRotorCells + data.numStatorCells}
                </td>
              </tr>
              <tr class="stripe-dark">
                <td>Volatility</td>
                <td>${data.volatility}<br>(Strict: ${data.strictVolatility})</td>
              </tr>
              <tr class="stripe-dark">
                <td>Bounding Box</td>
                <td>
                  ${data.boundingBox.xmax - data.boundingBox.xmin + 1}
                  x ${data.boundingBox.ymax - data.boundingBox.ymin + 1}
                </td>
              </tr>
            </tbody>
          </table>
        `;
        }
      };
    }
  };
  var OscStatsView_default = OscStatsView;

  // src/index.ts
  var appState = {
    oscInfo: new AppState_default(),
    initialCellStyle: new AppState_default()
  };
  if (window.Cypress) {
    window.appState = appState;
  }
  var inputRleSubmitter = document.getElementById("input-rle-submitter");
  var cellStyleSelector = document.getElementById("cell-style-selector");
  var inputRleContainer = document.getElementById("input-rle-container");
  var oscController = new OscStatsController_default(appState.oscInfo, inputRleContainer);
  var cellStyleController = new EventTargetPassingController_default(appState.initialCellStyle);
  inputRleSubmitter.addEventListener("click", oscController.update);
  cellStyleSelector.addEventListener("change", cellStyleController.update);
  var oscCanvas = document.getElementById("output-osc-canvas");
  var oscCanvasView = new OscillizerCanvasView_default(appState.oscInfo, appState.initialCellStyle, oscCanvas);
  appState.oscInfo.eventTarget.addEventListener("change", oscCanvasView.update);
  var oscStatsElement = document.getElementById("output-osc-data");
  var oscStatsView = new OscStatsView_default(appState.oscInfo, oscStatsElement);
  appState.oscInfo.eventTarget.addEventListener("change", oscStatsView.update);
})();
//# sourceMappingURL=index.js.map
