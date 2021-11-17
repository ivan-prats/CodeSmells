export class Game {
  private _board: Board = new Board();

  public Play(symbol: Symbol, x: number, y: number): void {
    this.ensureMoveOrderIsCorrect(symbol);
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): Symbol | " " {
    return this._board.playerWithThreeInARow;
  }

  private ensureMoveOrderIsCorrect(symbol: Symbol) {
    //if first move
    if (this._board.lastTilePlayed == null) {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (this._board.lastTilePlayed.hasSameSymbol(symbol)) {
      throw new Error("Invalid next player");
    }
  }
}

class Board {
  private _plays: Tile[] = [];
  private TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }
  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile = Tile.create(" ", i, j);
        this._plays.push(tile);
      }
    }
  }

  public lastTilePlayed: Tile | null = null;

  public AddTileAt(symbol: Symbol, x: number, y: number): void {
    Tile.create(symbol, x, y);

    const lastTilePlayed = this.TileAt(x, y);
    if (!this.TileAt(x, y).hasSameSymbol(" ")) {
      throw new Error("Invalid position");
    }

    if (lastTilePlayed) {
      lastTilePlayed.Symbol = symbol;
      this.lastTilePlayed = lastTilePlayed;
    }
  }

  public get playerWithThreeInARow(): Symbol | " " {
    //if the positions in first row are taken
    if (
      !this.TileAt(0, 0)!.hasSameSymbol(" ") &&
      !this.TileAt(0, 1)!.hasSameSymbol(" ") &&
      !this.TileAt(0, 2)!.hasSameSymbol(" ")
    ) {
      //if first row is full with same symbol
      if (
        this.TileAt(0, 0)!.hasSameSymbol(this.TileAt(0, 1)) &&
        this.TileAt(0, 2)!.hasSameSymbol(this.TileAt(0, 1))
      ) {
        return this.TileAt(0, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      !this.TileAt(1, 0)!.hasSameSymbol(" ") &&
      !this.TileAt(1, 1)!.hasSameSymbol(" ") &&
      !this.TileAt(1, 2)!.hasSameSymbol(" ")
    ) {
      //if middle row is full with same symbol
      if (
        this.TileAt(1, 0)!.hasSameSymbol(this.TileAt(1, 1)) &&
        this.TileAt(1, 2)!.hasSameSymbol(this.TileAt(1, 1))
      ) {
        return this.TileAt(1, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      !this.TileAt(2, 0)!.hasSameSymbol(" ") &&
      !this.TileAt(2, 1)!.hasSameSymbol(" ") &&
      !this.TileAt(2, 2)!.hasSameSymbol(" ")
    ) {
      //if middle row is full with same symbol
      if (
        this.TileAt(2, 0)!.hasSameSymbol(this.TileAt(2, 1)) &&
        this.TileAt(2, 2)!.hasSameSymbol(this.TileAt(2, 1))
      ) {
        return this.TileAt(2, 0)!.Symbol;
      }
    }

    return " ";
  }
}

interface TileI {
  X: number;
  Y: number;
  Symbol: Symbol | " ";
}

class Tile implements TileI {
  private constructor(
    public Symbol: Symbol | " ",
    public X: number,
    public Y: number
  ) {
    if (this.Symbol !== " " && this.Symbol !== "X" && this.Symbol !== "O")
      throw new Error("Invalid Symbol: " + Symbol);
  }

  public static create(symbol: Symbol | " ", x: number, y: number): Tile {
    return new Tile(symbol, x, y);
  }

  public hasSameSymbol(symbolOrTile: Symbol | " " | Tile) {
    if (symbolOrTile instanceof Tile)
      return this.Symbol === symbolOrTile.Symbol;
    else return this.Symbol === symbolOrTile;
  }
}

type Symbol = "O" | "X";
