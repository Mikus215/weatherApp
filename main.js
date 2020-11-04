const showName=document.querySelector('.show-name-of-city'); // showing name of city up input
const input=document.querySelector('.city'); // name of city choose by player
const btn=document.querySelector('.check'); // button to start program
const warning=document.querySelector('.warning'); // warning under input
const photo=document.querySelector('.photo'); // dynamic change, depends on weather
const weather=document.querySelector('.weather'); // info under about weather
const temperature=document.querySelector('.temp'); // info , temperature
const tempLike=document.querySelector('.temp-like'); // info tempLike
const humidity=document.querySelector('.humidity'); // info humidity
const pressure=document.querySelector('.pressure'); // info pressure

const apiLink='https://api.openweathermap.org/data/2.5/weather?q='; 
const celcuis='&units=metric'; //change to celcuis
let city; 

const apiKey='&appid=ff3e6306719122ddf57e0cbe41f4491a';


const getWeather = () =>
{
    city=(!input.value) ? 'Warsaw' : input.value;
    let url= apiLink+city+celcuis+apiKey;
    axios.get(url)
    .then(res=>{
        console.log(res)
        
        const temp=res.data.main.temp;
        const feelsL=res.data.main.feels_like;
        const hum=res.data.main.humidity;
        const press=res.data.main.pressure;
        
        const status=Object.assign({},...res.data.weather);
        
        let firstLetter=city.charAt(0).toUpperCase() + city.slice(1);
        showName.textContent=firstLetter;
        
        weather.textContent=status.main;;
        temperature.textContent=`${temp} °C`;
        tempLike.textContent=`${feelsL} °C`;
        humidity.textContent=`${hum} %`;
        pressure.textContent=`${press} hPa`;
        warning.classList.remove('warning-active');
        input.value='';
            
        if(status.id>=200&&status.id<300)
        {
            photo.setAttribute("src", "img/thunderstorm.png")
        }
        else if(status.id>=300&&status.id<500)
        {
            photo.setAttribute("src", "img/drizzle.png")
        }
        else if(status.id>=500&&status.id<600)
        {
            photo.setAttribute("src", "img/rain.png")
        }
        else if(status.id>=600&&status.id<701)
        {
            photo.setAttribute("src", "img/ice.png")
        }
        else if(status.id>=701&&status.id<800)
        {
            photo.setAttribute("src", "img/fog.png")
        }
        else if(status.id==800)
        {
            photo.setAttribute("src", "img/sun.png")
        }
        else if(status.id>=801&&status.id<=804)
        {
            photo.setAttribute("src", "img/cloud.png")
        }
        else 
        {
            photo.setAttribute("src", "img/unknown.png")
        }

        })
        .catch(()=>{
        warning.classList.add('warning-active'); 
        input.value=''; 
                    });
}
// enter lisiner
const enter = (e) =>
{
    if(e.keyCode===13)
    {
        getWeather();
    }
}
// liseners
getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enter);