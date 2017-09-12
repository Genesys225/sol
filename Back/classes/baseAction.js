
class baseAction {
    constructor(){
      
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",this)
    }
    getName(){
        return this.name
    }
    setName(name)
    {
        this.name = name
    }
    
    run(){
        console.log('Hello')
    }
}
module.exports = baseAction