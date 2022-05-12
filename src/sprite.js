
const gravity = 9.8;

export default class Sprite {
    constructor({position,velocity}){
      this.position = position;
      this.velocity = velocity;
      this.lastKey;
      this.height = 150;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y,50,this.height);
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
}