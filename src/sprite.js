
const gravity = 0.7;

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

    update(context,canvas) {
        this.draw(context);
       
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }else {
            this.velocity.y += gravity;
        }
    }
}