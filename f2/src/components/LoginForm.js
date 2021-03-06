const LoginForm = ({username,password,handleLogin,setPassword,setUsername}) => {

    return ( 
        <div>
            <h2>Login Form</h2>

            <form onSubmit={handleLogin}>
            <div>
            username 
            <input
            type='text'
            value={username}
            name = 'Username'
            onChange={({target})=>setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input
            type='password'
            value={password}
            name = 'Password'
            onChange={({target})=>setPassword(target.value)}
            />
            </div>
            <button type='submit'>Sign In</button>
        </form>
        </div>
     );
}
 
export default LoginForm;