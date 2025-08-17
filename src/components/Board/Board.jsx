import styles from "./Board.module.css";

function Board() {
  //Create an array with the numbers 1-90
  const gridNum = [];
  for (let i = 1; i <= 90; i++) {
    gridNum.push(i);
  }

  return (
    <div className={styles.board}>
      {gridNum.map((num, index) => (
        <span className={styles.boardItem} key={index}>
          {num}
        </span>
      ))}
    </div>
  );
}

export default Board;
