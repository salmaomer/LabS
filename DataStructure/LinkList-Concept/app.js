const Operations = require('./Operations');

const link = new Operations();



link.InsertFirst(5);
link.InsertFirst(10);
link.InsertEnd(15);
link.Print();

link.InsertAt(20,2);
link.Print();

link.RemoveData(5);
link.Print();