/**
 * Created by lizifen on 16/3/21.
 */
/**
 *  二叉树：前序（根，左，右）、中序（左，根，右）、后续（左，右，根），前中后是相对于跟节点而言
 */
(function (win) {
    function BinaryTree() {
        this.levelLength = 0;
        this.level = 0;
        this.node = 0;
        this.btSMF = function (level, node) {
            return node + (1 << level) - 1;
        };
        this.Nodes = new Array();
        this.setNode = function (value, level, node) {
            this.levelLength = this.levelLength < level ? level : this.levelLength;

            if (level === undefined) {
                this.Nodes[this.btSMF(this.level, this.node)] = {};
                this.Nodes[this.btSMF(this.level, this.node)].value = value;
                this.Nodes[this.btSMF(this.level, this.node)].level = level;
                this.Nodes[this.btSMF(this.level, this.node)].node = node;
            } else {
                this.Nodes[this.btSMF(level, node)] = {};
                this.Nodes[this.btSMF(level, node)].value = value;
                this.Nodes[this.btSMF(level, node)].level = level;
                this.Nodes[this.btSMF(level, node)].node = node;
            }
        }
        this.getNode = function (level, node) {
            if (level === undefined) {
                return this.Nodes[this.btSMF(this.level, this.node)];
            } else {
                return this.Nodes[this.btSMF(level, node)];
            }
        }
        this.root = function (value) {
            this.level = 0;
            this.node = 0;
            if (value !== undefined) {
                this.Nodes[this.btSMF(this.level, this.node)] = value;
            }
            return this.Nodes[this.btSMF(this.level, this.node)];
        }
        this.leftChild = function (value) {
            this.level++;
            this.node = this.node * 2;
            if (value !== undefined) {
                this.Nodes[this.btSMF(this.level, this.node)] = value;
            }
            return this.Nodes[this.btSMF(this.level, this.node)];
        }
        this.rightChild = function (value) {
            this.level++;
            this.node = this.node * 2 + 1;
            if (value !== undefined) {
                this.Nodes[this.btSMF(this.level, this.node)] = value;
            }
            return this.Nodes[this.btSMF(this.level, this.node)];
        }
        this.parent = function (value) {
            this.level--;
            this.node = this.node >> 1;
            if (value !== undefined) {
                this.Nodes[this.btSMF(this.level, this.node)] = value;
            }
            return this.Nodes[this.btSMF(this.level, this.node)];
        }

    }

    function DLR(eleArray) {
        eleArray = eleArray || [];
        eleArray.push(tree.getNode());

        if (tree.leftChild() !== undefined)DLR(eleArray);
        tree.parent();

        if (tree.rightChild() !== undefined)DLR(eleArray);
        tree.parent();

    }

    function LDR(eleArray) {
        eleArray = eleArray || [];

        if (tree.leftChild() !== undefined)LDR(eleArray);
        tree.parent();

        eleArray.push(tree.getNode());

        if (tree.rightChild() !== undefined)LDR(eleArray);
        tree.parent();
    }

    function LRD(eleArray) {
        eleArray = eleArray || [];

        if (tree.leftChild() !== undefined)LRD(eleArray);
        tree.parent();

        if (tree.rightChild() !== undefined)LRD(eleArray);
        tree.parent();

        eleArray.push(tree.getNode());
    }

    var tree = new BinaryTree();
    tree.setNode(1, 0, 0);
    tree.setNode(2, 1, 0);
    tree.setNode(3, 1, 1);

    tree.setNode(5, 2, 1);
    tree.setNode(5, 2, 2);
    tree.setNode(8, 2, 3);
    tree.setNode(9, 3, 3);
    tree.setNode(10, 3, 4);


    /*渲染二叉树
     渲染的时候是根据levalLength渲染的,先渲染整个坐标系，再渲染元素
     level
     */
    function renderTree() {
        var _eleTree = document.getElementById('tree');
        var _levels = tree.levelLength;

        //先渲染容器
        for (var l = 0; l <= _levels; l++) {
            var _elesLevel = document.createElement('div');
            _elesLevel.setAttribute('class', 'level');

            var _levelMaxNodes = Math.pow(2, l);
            for (var n = 0; n < _levelMaxNodes; n++) {
                var _eleNodeWrap = document.createElement('div');
                var _elesNode = document.createElement('div');

                _elesNode.setAttribute('class', 'node');

                if (!tree.getNode(l, n)) {
                    _elesNode.innerHTML = '';
                    _elesNode.setAttribute('class', 'node noNode');
                } else {
                    _elesNode.innerHTML = tree.getNode(l, n).value;
                }

                _eleNodeWrap.setAttribute('class', 'nodeWrap');
                _eleNodeWrap.setAttribute('style', 'width:' + (1 / _levelMaxNodes) * 100 + '%');

                _eleNodeWrap.appendChild(_elesNode);
                _elesLevel.appendChild(_eleNodeWrap);
            }
            _eleTree.appendChild(_elesLevel);
        }

    }

    win.traverse = function (type) {
        var _tree = document.getElementById('tree');
        var _levels = _tree.childNodes;
        var _elements = [];

        switch (type) {
            case 1:
                DLR(_elements);
                break;
            case 2:
                LDR(_elements);
                break;
            case 3:
                LRD(_elements);
                break;
        }

        var l = 0;

        setInterval(function () {
            if (l < _elements.length) {
                renderElement(_elements, l, _levels);
                l++;
            }
        }, 500);
    }

    function renderElement(elements, index, levels) {
        var _node = levels[elements[index].level].childNodes[elements[index].node].childNodes[0];

        for (var i = 0; i < elements.length; i++) {
            levels[elements[i].level].childNodes[elements[i].node].childNodes[0].setAttribute('class', 'node');
        }

        _node.setAttribute('class', 'node z-active');
    }

    renderTree();

}(window));
