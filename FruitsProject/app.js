const mongoose = require('mongoose');

const url = "mongodb+srv://theoeveraere:ACdCffJKui88Na@fruitsprojectangelatuto.uks5u.mongodb.net/FruitsDb";

mongoose.connect(url, { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please check your data entry, no name specified"]
        },
        rating: Number,
        review: String
    }
);

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit(
    {
        rating: 7,
        review: "Sweet"
    }
)

const pineapple = new Fruit(
    {
        name: "Pineapple",
        score: 9,
        review: "Great Fruit"
    }
)

// pineapple.save();

// fruit.save();

const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: "Amy",
    age: 14,
    favoriteFruit: pineapple
})



// person.save()

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        fruits.forEach(fruit => console.log(fruit.name))
    }
})

Person.updateOne(
    {
        _id: "61ccac8242b42dcf9ccdecec"
    },
    {
        favoriteFruit: pineapple
    },
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Succefully updated")
        }
    }
)

// Fruit.deleteOne(
//     {
//         _id: "61cca481fa460e1fb37d7c0e"
//     },
//     function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Successfully deleted")
//         }
//     }
// )

// Person.deleteMany(
//     { name: "John" },
//     function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Data Successfully Deleted");
//         }
//     }
// )