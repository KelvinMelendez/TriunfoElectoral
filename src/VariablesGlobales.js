var enviroment=window.location.href

function url_server_value(){
    if(enviroment.includes('localhost') || enviroment.includes('127.0.0.1')){
        return 'http://127.0.0.1:80/'
    }else{
        return '/'
    }
}
const url_server=url_server_value()
export default url_server