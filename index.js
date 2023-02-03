const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
 .then( async() => {
    // Run your code here, after you have insured that the connection was made
     const cake = {
      title: 'apple pie',
      level: 'Easy Peasy',
      ingredients: ['flour', 'sugar', 'eggs', 'apples', 'baking powder'],
      cuisine: 'grandma',
      dishType: 'dessert',
      duration: 180,
      creator: 'grandma',
      created: 2030-02-02
     }
     await Recipe.create(cake).then(() => {console.log(cake.title)})
   
     await Recipe.insertMany(data).then(() => { data.forEach(element => {  console.log(element.title)
     });
     })

    await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}).then(() => { console.log('Rigatoni alla Genovese was updated')})

    await Recipe.deleteOne({title:'Carrot Cake'}).then(() => {console.log('Carrot Cake was removed')})

    await mongoose.connection.close()    

  }) 

  .catch((error) => {
    console.log('Error connecting to the database', error)
  });



//** THIS IS A CLEANER WAY */

// connectDB()
// handler()
// async function connectDB () {
// try {
//   mongoose.connect(MONGODB_URI);
// }
// catch(error) {
//   console.log("Something went wrong", error)
// }
// }
// async function handler () {
//     await Recipe.deleteMany()
//     console.log(`Connected to the database`)
//     const recipeOne = {
//       title: 'Potato',
//       level: "Easy Peasy",
//       ingredients: [ "potato", "water", "love" ],
//       cuisine: "Brazilian",
//       dishType : "drink",
//       duration: 10,
//       creator: "Caroline"
//     }
//     await Recipe.create(recipeOne).then(()=>{ console.log("Recipe Added:", recipeOne.title)});
//     await Recipe.insertMany(data).then(()=>{
//       for (let i = 0; i < data.length; i++) {
//         console.log("Recipe Added:", data[i].title)
//       }
//     });
//     await Recipe.findOneAndUpdate(
//       {title: 'Rigatoni alla Genovese'},
//       {duration: 100},
//       {new: true})
//         .then(()=>{console.log("Updating Successful")})
//     await Recipe.deleteOne({title: "Carrot Cake"}).then(()=>{console.log("Deleting Successful")})
//     mongoose.disconnect();
// }

