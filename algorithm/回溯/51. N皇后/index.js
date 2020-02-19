/**
 * @param {number} n
 * @return {string[][]}
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
/**
   * @params row 行数，每次递归调用都加一，知道最后一行则输出结果
   * @params tmp 用于暂存列索引
   */
let qChar = 'Q', emptyChar = '.';
function backtrack(row, tmp = [], res, n) {
  // 当到达最后一行时结束，将tmp输出转化为目标值并加入到结果数组中
  if (row === n) {
    // 经过下面的循环，我们得到了一个每行的第几列是皇后的数据，
    // 例如：tmp=[1,3,1,2]
    // 代表第一行的第二个位置、第二行的第四个位置、第三行的第二个位置、第四行的第三个位置是皇后
    // 那么，有了这样的一个数组，我们就可以把它转化为目标棋盘上的棋子了
    // 从上面的数据，我们不难看出，数组的每一项，也就是每一行的列数，便是我们要放置字母“Q”的地方，而其他的位置则直接用“.”填充。我们观察4皇后的输出接口可以发现，第一行的皇后前面，刚好只有一个点，第二行的皇后前面有3个点。。。哈哈，这不就跟我们在tmp里存储的列数刚好对应上了吗？这就简单了每一行的字符串便可以通过：`${emptyChar.repeat(colIndex)}${qChar}${emptyChar.repeat(n-colIndex-1)}`得到了。我们只需使用数组的map方法，循环一下tmp数组，每循环一次用这种格式拼接字符串，这样就可以得到我们要的结果了
    res.push(tmp.map(colIndex => `${emptyChar.repeat(colIndex)}${qChar}${emptyChar.repeat(n - colIndex - 1)}`));
    return;
  }
  // 循环每一列
  for (let col = 0; col < n; col++) {
    // [
    //      [ * , 0 , 0 , 0 , # ],
    //      [ 0 , * , 0 , # , 0 ],
    //      [ 0 , 0 , 1 , 0 , 0 ],
    //      [ 0 , # , 0 , * , 0 ],
    //      [ # , 0 , 0 , 0 , * ]
    // ]
    // 从上面的5*5的二维数组看出，1的对角线所在的位置为“*”或"#"(之所以用两种符号表示，是为了区分两个对角线，因为他们的计算公式是不一样的)
    // 1的索引为:(2,2)
    // 左上右下的对角线，即(*)的坐标分别为：(0,0),(1,1),(3,3),(4,4)
    // 每一个坐标对比1的坐标：            (2,2),(2,2),(2,2),(2,2)
    // 得出左上右上对角线的通式：          (0,0)    =>  ( x  ,  y  )
    //                                 (2,2)    =>   (row,  col )
    //                                  2-0=2-0 =>  row-x=col-y =>  x = row - col + y
    // 
    // 左下右上的对角线，即(#)的坐标分别为：(4,0),(3,1),(1,3),(0,4)
    // 每个坐标对比1的坐标：              (2,2),(2,2),(2,2),(2,2)
    // 得出左下右上对角线通式：            (4,0)    =>  ( x ,   y )
    //                                 (2,2)    =>  ( row , col)
    //                                 2-4=-(2-0)   =>  row-x=-(col-y)  =>  x = row + col - y
    if (tmp.some((colIndex, rowIndex) => {
      return colIndex === col || // 如果缓存的数据与当前列相同，则直接跳过
        rowIndex === row - col + colIndex || //左上右下对角线(通式如上述)，则直接跳过
        rowIndex === row + col - colIndex //左下右上对角线（通式如上述），则直接跳过
    })) {
      continue;
    }
    // 只要上述判断没有排除掉的坐标，便是我们的待选坐标，由于一行只能有一个皇后，因此，无需继续往下循环，直接进入下一行查找
    // 在进入下一行查找时，把当前行找到的皇后位置加入到临时数组中，又因为一行只能有一个皇后，所以实际上tmp的索引便是棋盘的行数，而tmp的值便是其列数
    // 进入下一行
    backtrack(row + 1, [...tmp, col], res, n);
  }
}
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let res = [];


  backtrack(0, [], res, n);

  return res;

};