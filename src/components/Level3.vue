<!--
 * @Author: your name
 * @Date: 2021-10-21 12:57:51
 * @LastEditTime: 2021-10-23 20:39:23
 * @LastEditors: Please set LastEditors
 * @Description: Dian团队Web前端新人培训任务Level3，一个三子棋小游戏     
 * @FilePath: \diantrain\src\components\Level3.vue
-->
<template>
  <Board />
</template>

<script>
const Square = {
  template: `<button className="square" @click="$emit('onClickBut')">{{piece}}</button>`,
  props: { piece: String },
};
const Board = {
  components: { Square },
  template: `<div className="status">{{status}}</div>
        <div className="board-row">
          <Square @onClickBut="handleClick(0)" :piece="squares[0]" />
          <Square @onClickBut="handleClick(1)" :piece="squares[1]" />  
          <Square @onClickBut="handleClick(2)" :piece="squares[2]" />      
        </div>
        <div className="board-row">
          <Square @onClickBut="handleClick(3)" :piece="squares[3]" />          
          <Square @onClickBut="handleClick(4)" :piece="squares[4]" />
          <Square @onClickBut="handleClick(5)" :piece="squares[5]" />        
        </div>
        <div className="board-row">
          <Square @onClickBut="handleClick(6)" :piece="squares[6]" />          
          <Square @onClickBut="handleClick(7)" :piece="squares[7]" />
          <Square @onClickBut="handleClick(8)" :piece="squares[8]" />  
        </div>`,
  mounted() {
    this.showStatus();
  },
  beforeUpdate() {
    this.showStatus();
  },
  data() {
    return { squares: Array(9).fill(null), xIsNext: true, status: null };
  },
  methods: {
    handleClick(i) {
      const squares = this.squares.slice();
      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.xIsNext ? "X" : "O";
      this.squares = squares;
      this.xIsNext = !this.xIsNext;
    },
    /**
     * @description: 判断是否有连续的三个格子中都是同一种字符，如果为真，则表明已有一方获胜
     * @param {Array} squares
     * @return {*} squares[a]/null
     */
    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // 严格相等的优先级高于逻辑与优先级
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
      return null;
    },
    showStatus() {
      const winner = this.calculateWinner(this.squares);
      if (winner) {
        this.status = "Winner: " + winner;
      } else {
        this.status = "Next player: " + (this.xIsNext ? "X" : "O");
      }
    },
  },
};
export default {
  name: "GameLevel3",
  components: { Board },
};
</script>

<style>
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol,
ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.game {
  display: flex;
  flex-direction: row;
}
</style>
