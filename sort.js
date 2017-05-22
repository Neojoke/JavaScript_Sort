/*
1.插入排序—直接插入排序(Straight Insertion Sort)
基本思想:
将一个记录插入到已排序好的有序表中，从而得到一个新，记录数增1的有序表。即：先将序列的第1个记录看成是一个有序的子序列，然后从第2个记录逐个进行插入，直至整个序列有序为止。

要点：设立哨兵，作为临时存储和判断数组边界之用。

如果碰见一个和插入元素相等的，那么插入元素把想插入的元素放在相等元素的后面。所以，相等元素的前后顺序没有改变，从原无序序列出去的顺序就是排好序后的顺序，所以插入排序是稳定的。
效率：

时间复杂度：O（n^2）.

其他的插入排序有二分插入排序，2-路插入排序。



*/

function insertSort(array) {
    var count = array.length;
    for (var i = 1; i < count; i++) {
        if (array[i] < array[i - 1]) {
            var j = i - 1;
            var x = array[i];
            array[i] = array[i - 1];
            while (x < array[j] && j >= 0) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = x;
        }
    }
    console.log(array);
}
console.log('直插排序');
insertSort([1, 5, 0, 10, 8, 20]);
/*
 2. 插入排序—希尔排序（Shell`s Sort）
希尔排序是1959 年由D.L.Shell 提出来的，相对直接排序有较大的改进。希尔排序又叫缩小增量排序

基本思想：

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

操作方法：

1. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1； 
2. 按增量序列个数k，对序列进行k 趟排序； 
3. 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

*/
function ShellInsertSort(array, dk) {
    for (var i = dk; i < array.length; i++) {
        if (array[i] < array[i - dk]) {
            var j = i - dk;
            var x = array[i];
            array[i] = array[i - dk];
            while (x < array[j]) {
                array[j + dk] = array[j];
                j = j - dk;
            }
            array[j + dk] = x;
        }
    }
    return array;
}

function ShellSort(array) {
    var sortArray = array;
    var dk = array.length / 2;
    while (dk >= 1) {
        sortArray = ShellInsertSort(sortArray, dk);
        console.log(sortArray);
        dk = parseInt(dk / 2);
    }
    console.log("希尔排序");
    console.log(sortArray);
}
ShellSort([1, 5, 0, 10, 8, 20]);

/*
3. 选择排序—简单选择排序（Simple Selection Sort）

基本思想：

在要排序的一组数中，选出最小（或者最大）的一个数与第1个位置的数交换；然后在剩下的数当中再找最小（或者最大）的与第2个位置的数交换，依次类推，直到第n-1个元素（倒数第二个数）和第n个元素（最后一个数）比较为止。

操作方法：

第一趟，从n 个记录中找出关键码最小的记录与第一个记录交换；

第二趟，从第二个记录开始的n-1 个记录中再选出关键码最小的记录与第二个记录交换；

以此类推.....

第i 趟，则从第i 个记录开始的n-i+1 个记录中选出关键码最小的记录与第i 个记录交换，

直到整个序列按关键码有序。
*/
function selectCheckMin(array, index) {
    var min_index = index;
    for (var i = index; i < array.length; i++) {
        if (array[i] < array[min_index]) {
            min_index = i;
        }
    }
    return min_index;
}

function selectSort(array) {
    var n = array.length;
    var index = 0;
    for (var i = 0; i < n; i++) {
        var value = array[i];
        var left_min_index = selectCheckMin(array, i + 1);
        var left_min_value = array[left_min_index];
        if (value > left_min_value) {
            array[left_min_index] = value;
            array[i] = left_min_value;
        }
    }
    console.log(array);
}
console.log('选择排序');
selectSort([1, 5, 0, 10, 8, 20])
    /*
    简单选择排序的改进——二元选择排序
    简单选择排序，每趟循环只能确定一个元素排序后的定位。我们可以考虑改进为每趟循环确定两个元素（当前趟最大和最小记录）的位置,从而减少排序所需的循环次数。改进后对n个数据进行排序，最多只需进行[n/2]趟循环即可。具体实现如下：
    */
function simple_selectSort(array) {
    var n = array.length;
    var i, j, min, max, temp
        //不超过n/2趟排序
    for (i = 1; i <= n / 2; i++) {
        min = i;
        max = i;
        //从i以后到n-i,寻找最大与最小所在位置
        for (j = i + 1; j <= n - i; j++) {
            if (array[j] > array[max]) {
                max = j;
                continue;
            }
            if (array[j] < array[min]) {
                min = j;
            }
        }
        temp = array[i - 1];
        array[i - 1] = array[min];
        array[min] = temp;
        temp = array[n - i];
        array[n - i] = array[max];
        array[max] = temp;
    }
    console.log(array);
}
console.log('简单选择排序');
simple_selectSort([1, 5, 0, 10, 8, 20]);



/*
4. 选择排序—堆排序（Heap Sort）

堆排序是一种树形选择排序，是对直接选择排序的有效改进。
基本思想：

堆的定义如下：具有n个元素的序列（k1,k2,...,kn),当且仅当满足


时称之为堆。由堆的定义可以看出，堆顶元素（即第一个元素）必为最小项（小顶堆）。
若以一维数组存储一个堆，则堆对应一棵完全二叉树，且所有非叶结点的值均不大于(或不小于)其子女的值，根结点（堆顶元素）的值是最小(或最大)的。如：
（a）大顶堆序列：（96, 83,27,38,11,09)

  (b)  小顶堆序列：（12，36，24，85，47，30，53，91）





初始时把要排序的n个数的序列看作是一棵顺序存储的二叉树（一维数组存储二叉树），调整它们的存储序，使之成为一个堆，将堆顶元素输出，得到n 个元素中最小(或最大)的元素，这时堆的根节点的数最小（或者最大）。然后对前面(n-1)个元素重新调整使之成为堆，输出堆顶元素，得到n 个元素中次小(或次大)的元素。依此类推，直到只有两个节点的堆，并对它们作交换，最后得到有n个节点的有序序列。称这个过程为堆排序。

因此，实现堆排序需解决两个问题：
1. 如何将n 个待排序的数建成堆；
2. 输出堆顶元素后，怎样调整剩余n-1 个元素，使其成为一个新堆。

首先讨论第二个问题：输出堆顶元素后，对剩余n-1元素重新建成堆的调整过程。
调整小顶堆的方法：
1）设有m 个元素的堆，输出堆顶元素后，剩下m-1 个元素。将堆底元素送入堆顶（（最后一个元素与堆顶进行交换），堆被破坏，其原因仅是根结点不满足堆的性质。

2）将根结点与左、右子树中较小元素的进行交换。

3）若与左子树交换：如果左子树堆被破坏，即左子树的根结点不满足堆的性质，则重复方法 （2）.

4）若与右子树交换，如果右子树堆被破坏，即右子树的根结点不满足堆的性质。则重复方法 （2）.

5）继续对不满足堆性质的子树进行上述交换操作，直到叶子结点，堆被建成。

称这个自根结点到叶子结点的调整过程为筛选。如图：




再讨论对n 个元素初始建堆的过程。
建堆方法：对初始序列建堆的过程，就是一个反复进行筛选的过程。
1）n 个结点的完全二叉树，则最后一个结点是第个结点的子树。

2）筛选从第个结点为根的子树开始，该子树成为堆。

3）之后向前依次对各结点为根的子树进行筛选，使之成为堆，直到根结点。

如图建堆初始过程：无序序列：（49，38，65，97，76，13，27，49）
                              

                              
 

 算法的实现：

从算法描述来看，堆排序需要两个过程，一是建立堆，二是堆顶与堆的最后一个元素交换位置。所以堆排序有两个函数组成。一是建堆的渗透函数，二是反复调用渗透函数实现排序的函数。


*/


/**
 * 从arr[s...length]是需要调整的堆，arr[s]是不满足堆定义的结点
 * 调整arr[s],使其成为小顶堆.即对s和其左右结点进行比较，找到最小的，与s位置交换
 * 
 * @param {Array} arr 是待调整的堆数组
 * @param {int} s 是待调整的数组元素的位置
 * @param {int} length length是数组的长度
 * @returns 
 */
function HeapAdjust(arr, s, length) {
    var tmp = arr[s]; //纪录此时堆顶数据
    var child = 2 * s + 1; //左孩子结点的位置。child+1为当前调整前节点的右孩子结点的位置
    while (child < length) { //判断条件为一直循环到不能在构成子树
        //如果存在右子树结点，且右子树结点较小,则选择当前最小子树结点为右子树结点，否则则为左子树结点
        if (child + 1 < length && arr[child] > arr[child + 1]) { //如果右孩子大于左孩子(找到比当前待调整结点大的孩子结点)  
            child = child + 1; //设置当前最小子树结点为右子树结点
        }
        if (arr[s] < arr[child]) { //如果较小的子结点大于父结点
            arr[s] = arr[child] //将较大的节点代替父节点
            s = child //重置s, 即待调整的下一个结点的位置,此时要调整下个破坏了子树平衡的结点的子树
            child = 2 * s + 1 //修改下次要调整的结点的子树为2*s+1
        } else {
            //如果不再需要调整，则满足堆特性，可以停止循环
            break;
        }
        arr[s] = tmp //当前待调整的结点放值需要调整堆顶的值
    }
    // console.log(arr)
    return arr
}

/**
 * 初始化进行调整
 * 将arr[0...length-1]建成堆
 * @param {Array} arr 
 * @param {int} length 
 * @returns 
 */
function BuildingHeap(arr, length) {
    //最后一个有孩子的节点的位置 i=  (length -1) / 2 
    for (var i = (length - 1) / 2; i >= 0; --i) {
        arr = HeapAdjust(arr, i, length)
    }
    return arr
}

function HeapSort(arr) {
    var length = arr.length
    arr = BuildingHeap(arr)
    for (var i = length - 1; i > 0; --i) {
        var temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp
        arr = HeapAdjust(arr, 0, i)
    }
    console.log(arr)
    return arr
}
console.log('堆排序')
HeapSort([1, 5, 0, 10, 8, 20])