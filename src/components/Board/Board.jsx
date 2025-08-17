import styles from "./Board.module.css";

function Board(props) {

  const handleClick = (clickedNum) => {
    props.setGridNum(prev =>
      prev.map(item =>
        item.num === clickedNum ? { ...item, isCalled: !item.isCalled } : item
      )
    );
  }

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
