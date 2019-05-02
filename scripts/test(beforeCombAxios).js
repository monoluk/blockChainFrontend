



// var elementsArray = document.getElementsByTagName("h1");
// var element = elementsArray[0];
// var buttonElement = document.getElementById("get");
// var resultElement = document.getElementById('getResult1');

// buttonElement.addEventListener("click",function(){

// let hash = "000092c3054f046a2f6f89cdf45c3dde813dd469175c866dfa1baf624b9141dc"
//          axios.get('http://localhost:3001/block/'+hash)
//        .then(response => {resultElement.innerHTML ="<pre>"+response.data.index+ "</pre>"
//        }
//       )
// })




  // $("#transaction").click(function(){
  //   $("#transactioncriteria").toggle();
  // });
  // $("#show").click(function(){
  //   $("p").show();
  // });

function checkTransaction() {
	$("#transactioncriteria").toggleClass("hide");
	$("#blockcriteria").addClass("hide");
}



function checkBlock() {
	$("#blockcriteria").toggleClass("hide");
	$("#transactioncriteria").addClass("hide");
}

$("#searchBlockForm").submit(function(event){
	event.preventDefault();
	let value = $("#blockinput").val();

axios.get('http://localhost:3001/block/'+value)
       .then(response => {
       	let transactionsArray = response.data.transactions;

       	$("#blockTable").addClass("table-secondary table table-sm w3-table-all w3-round-xlarge");
       	$("#index").text("Block Index: ");
       	$("#indexcontent").text(response.data.index);
       	$("#timeStamp").text("Time Stamp: ");
       	$("#timeStampCotent").text(response.data.timestamp);
       	$("#nonce").text("Nonce: ");
       	$("#nonceContent").text(response.data.nonce);
       	$("#merkleRoot").text("Merkle Root: ");
       	$("#merkleRootContent").text(response.data.merkleRoot);
       	$("#hash").text("Block Hash: ");
       	$("#hashContent").text(response.data.hash);
       	$("#previousHash").text("Previous Block Hash: ");
       	$("#previousHashContent").text(response.data.previousBlockHash);
       	$("#numTrans").text("Number of Transactions in This Block");
       	$("#numTransContent").text(transactionsArray.length);


       	var html = "<table class=table> <thead class=thead-light><tr><th><b>Amount</b></th> <th><b>Sender</b></th> <th><b>Recipient</b></th></tr></thead>";
    for (var i = 0; i < transactionsArray.length; i++) {
        html+="<tr>";
        html+="<td scope=col>"+"$"+transactionsArray[i].amount+"</td>";
        html+="<td scope=col>"+transactionsArray[i].sender+"</td>";
        html+="<td scope=col>"+transactionsArray[i].recipient+"</td>";

        html+="</tr>";

    }
    html+="</table>";
    $("#transactionsResult").html(html);

       }
      ).catch(function(error){
      	alert("Block Not Found!")
      })

})


$("#paymentForm").submit(function(event){
event.preventDefault();
let amountInput = $("#amountInput").val();
let senderInput = $("#senderInput").val();
let recipientInput = $("#recipientInput").val();


axios.post('http://localhost:3001/transaction/broadcast',{
          "amount" :amountInput,
          "sender" : senderInput,
          "recipient" : recipientInput
       })
       .then(response =>{
       	$("#paymentConfirmation").show();
       	$("#processed").text("Note: Your instruction has been processed!")
        $("#notInBlock").text("Successful transaction will not be included in a block until mined.");
       	$("#noteMake").text("Note: ");
       	$("#noteContent").text(response.data.note);
       	$("#amountMake").text("Amount: ");
       	$("#amountContent").text("$" +response.data.amount);
       	$("#senderMake").text("Sender: ");
       	$("#senderContent").text(response.data.sender);
       	$("#recipientMake").text("Recipient: ");
       	$("#recipientContent").text(response.data.recipient);
       	$("#transactionIDmake").text("Transaction ID: ");
       	$("#transactionIDContent").text(response.data.transactionId);
       	});



})



$("#searchTran").click(function(){
	let value = $("#transactioninput").val();
	axios.get('http://localhost:3001/transaction/'+value)
	.then(response=>{
    
		$("#paymentSearchResult").show();
    $("#paymentSearchResult").addClass("table-secondary table table-sm w3-table-all w3-round-xlarge")
		$("#transactionIDSearch").text("Transaction ID: ");
       	$("#transactionIDSearchContent").text(response.data.transaction.transactionId);
		$("#amountSearch").text("Amount: ");
       	$("#amountSearchContent").text("$"+response.data.transaction.amount);
       	$("#senderSearch").text("Sender: ");
       	$("#senderSearchContent").text(response.data.transaction.sender);
       	$("#recipientSearch").text("Recipient: ");
       	$("#recipientSearchContent").text(response.data.transaction.recipient);
       	$("#inBlock").text("This Transaction is Located in the Following Block :");
       	$("#indexSearch").text("Block Index:");
       	$("#indexSearchcontent").text(response.data.inBlock.index);
        $("#indexSearchcontent").val(response.data.inBlock.index);
       	$("#timeStampSearch").text("Time Stamp:");
       	$("#timeStampSearchCotent").text(response.data.inBlock.timestamp);
       	$("#hashSearch").text("Block Hash:");
       	$("#hashSearchContent").text(response.data.inBlock.hash);
	}).catch(error=>{
		alert("Transaction Not Found!");
    $("#paymentSearchResult").hide();
	})
})



$("#indexSearchcontent").click(function(event){

  event.preventDefault();
  let value = $("#indexSearchcontent").val();


axios.get('http://localhost:3001/block/'+value)
       .then(response => {
        let transactionsArray = response.data.transactions;
        $("#blockcriteria").toggleClass("hide");
        $("#blockTable").addClass("table-secondary table table-sm w3-table-all w3-round-xlarge");
        $("#index").text("Block Index: ");
        $("#indexcontent").text(response.data.index);
        $("#timeStamp").text("Time Stamp: ");
        $("#timeStampCotent").text(response.data.timestamp);
        $("#nonce").text("Nonce: ");
        $("#nonceContent").text(response.data.nonce);
        $("#merkleRoot").text("Merkle Root: ");
        $("#merkleRootContent").text(response.data.merkleRoot);
        $("#hash").text("Block Hash: ");
        $("#hashContent").text(response.data.hash);
        $("#previousHash").text("Previous Block Hash: ");
        $("#previousHashContent").text(response.data.previousBlockHash);
        $("#numTrans").text("Number of Transactions in This Block");
        $("#numTransContent").text(transactionsArray.length);


        var html = "<table class=table> <thead class=thead-light><tr><th><b>Amount</b></th> <th><b>Sender</b></th> <th><b>Recipient</b></th></tr></thead>";
    for (var i = 0; i < transactionsArray.length; i++) {
        html+="<tr>";
        html+="<td scope=col>"+"$"+transactionsArray[i].amount+"</td>";
        html+="<td scope=col>"+transactionsArray[i].sender+"</td>";
        html+="<td scope=col>"+transactionsArray[i].recipient+"</td>";

        html+="</tr>";

    }
    html+="</table>";
    $("#transactionsResult").html(html);

       }
      ).catch(function(error){
        alert("Block Not Found!")
      })

})











//resultElement.innerHTML= response.data.transactions[0].transactionId
       	// $("#amount").text("Amount: ");
       	// $("#amountcontent").text(response.data.transactions[0].amount);
//table border='1|1'
