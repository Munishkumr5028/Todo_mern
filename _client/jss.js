let expenses = [500, 1000, 1500];

let total = expenses.reduce((sum, expense) => {

    
    console.log(`Previous sum: ${sum}, Current expense: ${expense}, New sum: ${sum + expense}`);
    return sum + expense;
}); // Initial value of sum is 5

console.log("Final Total:", total); // 3005
