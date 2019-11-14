import { Component} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  private user_name:String;
  private user_age:Number = 0;
  private users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data)=> {
      this.users = data;
    })
  }

  addUser(){
    const user = new User();
    user.name = this.user_name;
    user.age = this.user_age;
    this.userService.addUser(user).subscribe((data)=>{
        console.log(data);
        this.getUsers();
        alert("User Added!");
        this.user_name = "";
        this.user_age=0;
      }
    )
  }

  deleteUser(id){
    if(confirm("Delete user info?")){
      this.userService.deleteUser(id).subscribe((data)=>{
        console.log(data);
        this.getUsers();
        alert("User Deleted!");
        }
      )
    }
  }

  updateUser(id){
    if(confirm("Update user info?")){
      const user = new User();
      user.name = this.user_name;
      user.age = this.user_age;
        this.userService.updateUser(user, id).subscribe((data)=>{
          console.log(data);  
          this.getUsers();
          alert("User Updated!");
          this.user_name = "";
          this.user_age = 0;
        }
      )
    }
  }
}
