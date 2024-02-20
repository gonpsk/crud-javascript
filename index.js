function loadtable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.melivecode.com/api/users");
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trhtml = '';
            const objects = JSON.parse(this.responseText);
            
            for (let object of objects) { // Access 'data' property
                trhtml += '<tr>';
                //  td = table data
                trhtml += '<td>' + object['id'] + '</td>';
                trhtml += '<td><img width="50px" src="'+object['avatar']+'"></td>'
                trhtml += '<td>' + object['fname'] + '</td>'; 
                trhtml += '<td>' + object['lname'] + '</td>'
                trhtml += '<td>' + object['username'] + '</td>'
                trhtml += '<td><button type="button" onclick="showusereditbox('+ object['id'] +')" class="btn btn-outline-secondary">Edit</button>'
                trhtml += '<button type="button" class="btn btn-outline-danger" onclick="showuserdeletebox('+ object['id'] +')">Delete</button>'
                trhtml += '</td>';
                trhtml += '</tr>';
            }

            document.getElementById('mytable').innerHTML = trhtml;
        }
    };
}

loadtable();

function showusercreatebox() {
    // swal.fire เปน library ของ sweetalert
    Swal.fire({
        title: "Multiple inputs",
        html: `
          <input id="fname" class="swal2-input" placeholder="First">
          <input id="lname" class="swal2-input" placeholder="Last">
          <input id="username" class="swal2-input" placeholder="username">
          <input id="email" class="swal2-input" placeholder="Email">
        `,
        focusConfirm: false,
        preConfirm: () => {
            usercreate();
        }
    });
}


      function usercreate() {
        
        const fname = document.getElementById('fname').value
        const lname = document.getElementById('lname').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value

        const xhttp = new XMLHttpRequest();
        // พวก api ให้ดูลิ้งดีๆ เงื่อนไขของแต่ละapi และ method
        xhttp.open('POST','https://www.melivecode.com/api/users/create');
        xhttp.setRequestHeader("Content-Type", "application/json");
        // ส่งข้อมูลไปยังเว็ปเซอร์วิสในรูปแบบ json
        xhttp.send(JSON.stringify({
            "fname":fname, "lname":lname,"username":username,
            "email":email,
            "avatar":"https://www.melivecode.com/users/3.png"
             }));
        xhttp.onreadystatechange = function () {
            // ถ้าเรียกเซอวิสสำเร็จ คือ state = 4 status = 200
            if(this.readyState ==4 && this.status ==200){
                const objects = JSON.parse(this.responseText)
                Swal.fire(objects['message'])
                loadtable();
            }
        }


        

      }

      function showusereditbox(id){
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://www.melivecode.com/api/users/"+id);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if(this.readyState ==4 && this.status ==200){
                const objects = JSON.parse(this.responseText)
                const user =objects['user']
                Swal.fire({
                    title: "Multiple inputs",
                    html: `
                      <input id="id" type="hidden" value="${user['id']}">
                      <input id="fname" class="swal2-input" placeholder="First" value="${user['fname']}">
                      <input id="lname" class="swal2-input" placeholder="Last" value="${user['lname']}">
                      <input id="username" class="swal2-input" placeholder="username" value="${user['username']}">
                      <input id="email" class="swal2-input" placeholder="email" value="${user['email']}">
                    `,
                    focusConfirm: false,
                    preConfirm: () => {
                        useredit();

                        
                        // usercreate();
                    }
                });

            }
        }
            

      }

      function useredit() {
        const id = document.getElementById('id').value
        const fname = document.getElementById('fname').value
        const lname = document.getElementById('lname').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value

        const xhttp = new XMLHttpRequest();
        xhttp.open('PUT', 'https://www.melivecode.com/api/users/update');
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            "id":id,"fname":fname, "lname":lname,"username":username,
            "email":email,
            "avatar":"https://reqres.in/img/faces/6-image.jpg"
             }));
        
             xhttp.onreadystatechange = function () {
            if(this.readyState ==4 && this.status ==200){
                const objects = JSON.parse(this.responseText)
                Swal.fire(objects['message'])
                loadtable();
            }
        }

        


        

      }

    
    function showuserdeletebox(id) {
        Swal.fire({
            title: 'Delete User',
            text: 'Are you sure you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const xhttp = new XMLHttpRequest();
                    xhttp.open('DELETE', 'https://www.melivecode.com/api/users/delete');
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.send(JSON.stringify({
                        "id":id
                         }));
                    
                         xhttp.onreadystatechange = function () {
                        if(this.readyState ==4 && this.status ==200){
                            const objects = JSON.parse(this.responseText)
                            Swal.fire(objects['message'])
                            loadtable();
                        } else {
                            Swal.fire('error deleting user')
                        }
                    }
                }
            
            
            
            })}


    
