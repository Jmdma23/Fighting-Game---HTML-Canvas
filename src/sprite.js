
const gravity = 9.8;

export default class Sprite {
    constructor({position,velocity, color = 'red',offSet = { x:0,y:0}}){
      this.position = position;
      this.velocity = velocity;
      this.lastKey;
      this.height = 150;
      this.width = 50;
      this.attackBox = {
          position: {
              x: position.x,
              y: position.y,
          },
          offSet,
          width: 100,
          height: 50,
      }
      this.color = color;
      this.isAttacking;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y,this.width,this.height);

        this.attackBox.position.x = this.position.x + this.attackBox.offSet.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offSet.y;

        //attack box draw
        if(this.isAttacking){
            context.fillStyle = 'green';
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y , this.attackBox.width , this.attackBox.height)
        }
    }

    update(context,canvas,elapsed_time) {
        
        const distanceX = elapsed_time * this.velocity.x;
        const distanceY = elapsed_time * this.velocity.y;
       
        this.position.y = (this.position.y + distanceY) ;
        this.position.x = (this.position.x + distanceX) ;

        

        if(this.position.y + this.height + distanceX >= canvas.height){
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height ;
        }else {
            this.velocity.y += gravity;
        }

        this.draw(context);
    }

    attack(){
        this.isAttacking = true;
        setTimeout(()=> {
            this.isAttacking = false;
        },100)
    }
}