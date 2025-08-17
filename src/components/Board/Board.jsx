import styles from "./Board.module.css";

function Board(props) {
  return (
    <div className={styles.board}>
      {props.gridNum.map((item, index) => (
        <span 
          className={`${styles.boardItem} ${item.isCalled ? styles.called : ''}`} 
          key={index} 
          onClick={() => handleClick(item.num)}
        >
          {item.num}
        </span>
      ))}
    </div>
  );
}

export default Board;
