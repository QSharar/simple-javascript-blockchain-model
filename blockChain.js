var SHA256 = require("crypto-js/sha256");

class Block {

    constructor(sender, reciever, amount, prevHash){
        this.sender = sender;
        this.reciever = reciever;
        this.amount = amount;
        this.date = Date.now();
        this.prevHash = prevHash;
        this.hash = this.calculateHash();

    }

    calculateHash(){
         return SHA256(this.sender+this.reciever+this.date+this.amount+this.prevHash).toString();
    }

}


class BlockChain {
    
    constructor(){
        
        this.chain = [(this.createGenesis())];
    }

    createGenesis(){
        return new Block("first", "block", 0, 0);
        
    }

    addBlock(sender, reciever, amount){
        let block = new Block(sender, reciever, amount, this.chain[this.chain.length-1].hash);
        this.chain.push(block);

    }

    printChain(){
        console.log(blockChain);
    }

    isValid(){
        for( var i = 1; i<this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if( currentBlock.prevHash !== previousBlock.hash){
                return false;
            }
            if ( currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
        }

        return true;
    }
}

// creating new instance of blockchain

let blockChain = new BlockChain();
blockChain.addBlock("xxx", "yyy", 100000);


new Promise( (resolve, reject) => {
    for(var i=0; i<10; i++){
        let rand = ["Afdfd", "bfdbAd343fadf", "llll3242asdfasas" , "5253rqe123wdfsfg"]
        blockChain.addBlock( rand[Math.round(Math.random()*4)], rand[Math.round(Math.random()*4)], rand[Math.round(Math.random()*4)]);
    }
    resolve();
}).then( () => { //input fake data
    blockChain.chain[2].amount = 100000;
    blockChain.chain[2].hash = blockChain.chain[2].calculateHash(); 
    }).then( () => console.log(blockChain.isValid()) ); //check if blockchain validation works 

//print blockchain

blockChain.printChain();
