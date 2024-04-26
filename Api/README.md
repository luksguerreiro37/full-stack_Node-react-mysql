**ROTAS**
/Auth => login(para receber o token de autenticação).
    reqBody = {
        "mail": "example@example.com",
        "password": "senha1234"
    }

/Users:
Post => Criação de usuário.
    reqBody = {
        "mail": "example@example.com", 
        "password": "senha1234", 
        "name": "Exemplito",
        "photoString": "base64encodedphoto"
    }
    validação =>
        mail - string, email válido;
        password - string, minimo de 8 caracteres;
        name - string, máximo de 50 caracteres;
        photoString - link da imagem;

Get => pegar as informações do usuário.
    é necessário o token de autenticação recebido no login;
    puxa as informações do usuário e manda uma response com a senha criptografada atraves do hash do bcrypt
    {
        "id": "8c95a5cc-780d-48b2-803e-b38b6e024fb3",
        "mail": "example12@example.com",
        "password": "$2b$08$uY0A2speEedNbrVTIXqFzOMMV709Nt9xqfA1GV8tN4NDM3hmYNSIO",
        "name": "Exemplito",
        "profilePhoto": "base64encodedphoto",
        "createdAt": "2024-04-15T04:20:06.000Z",
        "updatedAt": "2024-04-15T04:20:06.000Z"
    }

Put => atualizar as informações do usuário.
    é necessário o token de autenticação recebido no login;
    reqBody = {
        "mail": "example@example.com", 
        "password": "senha1234", 
        "name": "Exemplito",
        "photoString": "base64encodedphoto"
    }
    validação =>
        mail - string, email válido;
        password - string, minimo de 8 caracteres;
        name - string, máximo de 50 caracteres;
        photoString - link da imagem;

Delete => deleta o usuário.
    é necessário o token de autenticação recebido no login;
    