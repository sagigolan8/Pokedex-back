const baseUrl = "https://pokemonsagi.herokuapp.com";

const userText = document.getElementById("search");
button.addEventListener("click", () => {
  window.scrollTo(0, 250);
  //When the user clicks on the button the wanted pokemon shows up
  getPokemonsByIdOrName(userText.value.toLowerCase());
});
userText.addEventListener("keydown", (e) => {
  //When the user press enter in the input box the wanted pokemon shows up
  if (e.key === "Enter"){ getPokemonsByIdOrName(userText.value.toLowerCase());
    window.scrollTo(0, 250);
  }
});

const getPokemonsByIdOrName = async (idOrName) => {
  //Gets some id and gives all data about the pokemon with the match id or his name
  try {
    removePreviousTypesFromDom(".newType");
    removePreviousTypesFromDom(".new-poke-by-type");
    const response = await getPokemonByNameOrId(idOrName)
    changeToBackDefaultOnHover(response);
    showPokemonData(response);
    getType();
  } catch (error) {
    errorAlert("Oh no!","hey bud this pokemon doesn't exist.... try another one");
    console.error(error);
  }
};  

    async function getPokemonByNameOrId(idOrName){
      let response  
      if(!isNaN(idOrName))
      response = await axiosRequest('get',`pokemon/get/${idOrName}`,'a');
      else 
      response = await axiosRequest('get',`pokemon/query?name=${idOrName}`,'a');
      return response
    }

      function showPokemonData(recievedData) {
        //Get user data and shows it in the dom
        pokeId.textContent = recievedData.id;
        pokeNameVal.textContent = ` ${recievedData.name}`;
        pokeHeightVal.textContent = ` ${recievedData.height} cm`;
        pokeWeightVal.textContent = ` ${recievedData.weight} grams`;
        addSpan(recievedData);
      }
      function changeToBackDefaultOnHover(recievedData) {
        //Make the image change to back_default on hover
        pokeImg.src = recievedData.front_pic;
        pokeImg.onmouseenter = function () {
          pokeImg.src = recievedData.back_pic;
        };
        pokeImg.onmouseout = function () {
          pokeImg.src = recievedData.front_pic;
        };
      }

      function removePreviousTypesFromDom(cls) {
        //Remove the old types of the previous pokemon from dom
        for (const newType of document.querySelectorAll(cls)) {
          newType.remove();
        }
      }

      function getType() {
        //The function gets the types of the pokemon
        pokeTypesVal.addEventListener("click", async (e) => {
          const typeText = e.target.textContent
            .replaceAll("|", "")
            .replaceAll(" ", "");
          const response = await axios.get(`${baseUrl}/type/${typeText}`);
          renderPokemonsToDom(response.data.pokemon);
          document.getElementById("related-pokemons").addEventListener("click", (e) => {
              e.stopImmediatePropagation();
              userText.value = e.target.textContent;
              getPokemonsByIdOrName(e.target.textContent);
            });
          window.scrollTo(0, 300);
        });
      }

      function addSpan(recievedData) {
        //Add a span with the types of the pokemon
        for (let i = 0; i < recievedData.types.length; i++) {
          const newSpan = document.createElement("span");
          newSpan.classList.add("newType");
          newSpan.innerHTML = ` ${recievedData.types[i].type.name}</br> `;
          pokeTypesVal.append(newSpan);
        }
      }

      function renderPokemonsToDom(pokemons) {
        //Render the pokemons with the same type as a list
        removePreviousTypesFromDom(".new-poke-by-type");
        pokemons.forEach((pokemon) => {
          const newList = document.createElement("li");
          newList.className =
            "new-poke-by-type list-group-item list-group-item-action list-group-item-dark";
          newList.textContent = pokemon.pokemon.name;
          document.getElementById("related-pokemons").append(newList);
        });
      }

      catchButton.onclick = async ()=>{
      if(document.getElementById('connect').textContent === ''){//then you cant catch
      errorAlert("Nice try!","you can't catch pokemons if you aren't logged in")
      return
      }
      if(pokeNameVal.textContent === ''){
      errorAlert("Oops",'you must search some pokemon to catch one')
      return
      }
      const pokemonId = pokeId.textContent
      const userName =  document.getElementById('connect').textContent.split('').splice(14).join('')
      const response =  await axiosRequest('put',`pokemon/catch/${pokemonId}`,userName)
      if(!response)
      errorAlert("You can't do that😥",'Pokemon already caught')
      else
      pokemonCatchedAlert(response)
    }



      releaseButton.onclick = async ()=>{ //handle release button
        if(document.getElementById('connect').textContent === ''){
        errorAlert('Oops',"you can't catch pokemons if you aren't logged in")
        return
        }
        const pokemonId = pokeId.textContent
        const userName =  document.getElementById('connect').textContent.split('').splice(14).join('')
        const response =  await axiosRequest('delete',`pokemon/release/${pokemonId}`,userName) 
        if(!response)
        errorAlert('Oops',"you can't release pokemon you didn't caught")
        else
        pokemonReleaseAlert(response)
        }



      signInButton.addEventListener('click', ()=>{//Listen to sign up button click 
        handleSignIn()
      })
      userNameSignIn.addEventListener('keydown', (e)=>{//Listen to sign up input 'Enter' key
      if (e.key === "Enter") 
      handleSignIn()
    })
      const handleSignIn = async ()=>{//handle sign in button function
      window.scrollTo(-500,0);
        const userNameVal = userNameSignIn.value
        if(!userNameVal){
          errorAlert('No content!','type something...')
          return
          }
          const response =  await axiosRequest('get','users/info/login',userNameVal) 
          if(response){//if there is such username
            niceAlert('you logged in, try to catch some pokemons!')
            connected(userNameVal)//show the connected sign
          }
          else{
          errorAlert('No content!',"your username doesn't exsist, click the link below to sign up!")
          document.getElementById('connect').textContent = ''
          }
      }

        function connected(userName){//connect to the web show green mark left top sign
          const connectNofiaction = document.getElementById('connect')
          connectNofiaction.className = 'connected'
          connectNofiaction.textContent = `connected as: ${userName}`
          connectNofiaction.style.color = 'green'
        }
      
        async function axiosRequest(methodPath,partialPath,userName)
          {//the function get method,path and username and handle the axios request
            try {
              const response = await axios({
                method: methodPath,
                url: `${baseUrl}/${partialPath}` ,
                body: {
                },
                headers: {
                username: userName
              },
              });
              return response.data
            } catch (err) {
              console.log(err);
            }
          }


        signUpButton.addEventListener('click', ()=>{//Listen to sign up button click 
          handleSignUp()
        })
        userNameSignUp.addEventListener('keydown', (e)=>{//Listen to sign up input 'Enter' key
        if (e.key === "Enter") 
        handleSignUp()
        })

      const handleSignUp = async ()=>{//handle sign up button function
      const userNameVal = userNameSignUp.value
      if(!userNameVal){
      errorAlert('No content!','type something...')
      return
      }
      const response =  await axiosRequest('post','users/info',userNameVal)  
      niceAlert(response)
      if(response.includes("signed up")){//if there is such username
      connected(userNameVal)//show the connected sign
        window.scrollTo(-700,0);
      }
      }


       caughtPokes.onclick = async ()=>{//for sign up to web
        const userName = document.getElementById('connect').textContent.split('').splice(14).join('')
        showUserPokes.textContent = ''
        if(userName === '' || userName === undefined){
          errorAlert('Oops','you must sign in in order to see your pokemons')
          return
        }
        const pokemonsArray =  await axiosRequest('get','pokemon/',userName)
        showUserPokes.style.color = 'white'
        showUserPokes.textContent = pokemonsArray.join(' | ')
      }














////////////////////////////////////////-- Alerts messeges  --///////////////////////////////////////////////////////
     
      const errorAlert  = (titleVal,textVal) =>{
        Swal.fire({
            icon: 'error',
            title: titleVal,
            text: textVal,
          })
        }
      const pokemonCatchedAlert = (textVal) =>{
        Swal.fire({
          title: 'Nice!',
          text: textVal,
          imageUrl: 'images/pokemonCatched.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        }
      const pokemonReleaseAlert =(textVal) =>{
        Swal.fire({
          title: 'Ohhh!',
          text: textVal,
          imageUrl: 'images/pokemonRelease.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        }
      const niceAlert  = (textVal) =>{
        Swal.fire({
          title: textVal,
          width: 600,
          padding: '3em',
        })
        }


