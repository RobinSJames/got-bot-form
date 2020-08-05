import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Toastr
  constructor(private toastr: ToastrService, private http: HttpClient) {}
  showToast(head, body, obj) {
    this.toastr.success(head, body, obj);
  }

  //Data declarations
  title = 'angular-client';
  email = ''
  emailSuccess = false
  name = ' '
  nameSuccess = false
  number = ' '
  numberSuccess = false
  id = null
  object = {
    email: '',
    name: ' ',
    number: ' '
  }
  resArr = []
  loading = false
  API = 'http://localhost:3000/api'
  isFocused = false

  // Methods
  addDetail(input) {
    if (input == 'email') {
      this.loading = true
      this.object[input] = this.email
      this.http.post(`${this.API}/users/add`, this.object)
        .subscribe((res) => {
          this.resArr.push(res)
          console.log(this.resArr)
          this.showToast(`Your ${input} was stored successfully`, `Saved ${this.email}`, {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          })
          this.emailSuccess = true
          this.id = this.resArr[0]._id
          this.loading = false
        })
    } else if (input == 'name') {
      this.loading = true
      this.object[input] = this.name.substr(1)
      this.http.put(`${this.API}/users/${this.id}`, this.object)
        .subscribe((res) => {
          this.resArr = []
          this.resArr.push(res)
          this.showToast(`Your ${input} was stored successfully`, `Saved ${this.name}`,  {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          })
          this.nameSuccess = this.resArr[0].success
          this.loading = false
        })
    } else if (input == 'number') {
      this.loading = true
      this.object[input] = this.number.trim()
      this.http.put(`${this.API}/users/${this.id}`, this.object)
        .subscribe((res) => {
          this.resArr = []
          this.resArr.push(res)
          this.showToast(`Your ${input} was stored successfully`, `Saved ${this.number}`,  {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          })
          this.numberSuccess = this.resArr[0].success
          this.loading = false
        })
    }
  }
  confirmDetails() {
    this.emailSuccess = !this.emailSuccess
    this.email = ''
    this.nameSuccess = !this.nameSuccess
    this.name = ' '
    this.numberSuccess = !this.numberSuccess
    this.number = ' '
    this.object = {
      email: this.email,
      name: this.name,
      number: this.number
    }
  }
}
