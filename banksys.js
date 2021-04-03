let we = getCustomers()
const data=document.querySelector("#data")
const addbtn=document.querySelector('#add')
const filterbtn=document.querySelector('#filter')
const showbtn=document.querySelector('#customers')
const addform=document.querySelector('#addform')
let f=document.querySelector('#find')
var customers=[
    {name:'bardesy',accname:'vodacash',balance:150},
    {name:'goba',accname:'vodacash',balance:250}
]
const tableHeaders=['id','name','accname','balance','transaction']
var transaction = [
    {txt:'delete', classes:'btn btn-danger m-2'},
    {txt:'add balnce', classes:'btn btn-info m-2'},
    {txt:'withdraw', classes:'btn btn-primary m-2'},
 ]
 function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}
const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}
addbtn.addEventListener('click',function(e){
 addform.classList.toggle('d-none')

})
filterbtn.addEventListener('click',function(e){
    
    f.classList.toggle('d-none')
})
addform.addEventListener('submit',function(e){
    e.preventDefault()
    let customer={
        name: this.elements.name.value,
        balance: parseInt(this.elements.balance.value),
        accname:this.elements.accname.value

    }
    customers.push(customer)
    this.reset()
    this.classList.add('d-none')
    showall()
    saveCustomers()
})
showbtn.addEventListener('click',function(e){
   
    document.querySelector('#showform').classList.toggle('d-none')
})
const addElement=function(eletybe,parent,txt='',classes=''){ 
    ele=document.createElement(eletybe)
    if(txt!='') ele.innerText=txt
    if(classes!='') ele.classList=classes
    parent.appendChild(ele)
    return ele
}
const showall=function(){
    we = getCustomers()
    data.innerText=''
    customers.forEach((customer,i)=>{
        tr=addElement('tr',data)
        tableHeaders.forEach(element=>{
            if(element=='id')txt=Date.now()
            else if(element=='transaction')txt=''
            else txt=customer[element]
            td=addElement('td',tr,txt)

        })
        transaction.forEach(transactions=>{
            btn = addElement('button', td, transactions.txt, transactions.classes)
            btn.addEventListener('click',function(e){
                if(transactions.txt=='delete') deletecus(i)
                else if(transactions.txt=='add balnce') balancecus(i)
                else if(transactions.txt=='withdraw') withdrawcus(i)                
        })

        })


    })

}
const findcus=function(key){
    
    filtered=customers.filter( customer=> customer.name.includes(key)===true)

    alert(JSON.stringify(filtered));
  
}
f.addEventListener('input',function(e){
    console.log(this.value);
    findcus(this.value);
})
const deletecus=function(ind){
    customers.splice(ind,1)
    showall()
    saveCustomers()
}
const balancecus=function(ind){
    let amount = parseInt(prompt('enter amount'))
    customers[ind].balance += amount
    showall()
    saveCustomers()
}
const withdrawcus=function(ind){
    let draw = parseInt(prompt('enter amount'))
    if((customers[ind].balance)>=draw){
    customers[ind].balance = customers[ind].balance-draw
    showall()
    saveCustomers()
}
else alert('plase enter v num')
}
showall()

