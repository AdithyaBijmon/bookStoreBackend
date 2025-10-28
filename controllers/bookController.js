const books = require("../models/bookModel")

exports.addBookController = async (req, res) => {
  console.log("Inside add book ")

  // console.log(req.body)
  const { title, author, noOfPages, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category } = req.body
  // console.log(req.files)
  const userMail = req.payload
  var uploadImg = []
  req.files.map(item => uploadImg.push(item.filename))
  // console.log(title, author, noOfPages, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail)

  try {
    const existingBook = await books.findOne({ title, userMail })
    if (existingBook) {
      res.status(401).json("You have already added the book")
    }
    else {
      const newBook = new books({
        title, author, noOfPages, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail
      })

      await newBook.save()
      res.status(200).json(newBook)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }

}


// get home books
exports.getHomeBooks = async (req, res) => {
  console.log("Inside GetHomeBooks")
  try {
    const allHomeBooks = await books.find().sort({ _id: -1 }).limit(4)
    res.status(200).json(allHomeBooks)
  } catch (err) {
    console.log(err)
  }
}

// get all books
exports.getAllBooks = async (req, res) => {
  console.log("Inside getAllBooks")
  const searchKey = req.query.search
  const email = req.payload

  const query = {
    title: { $regex: searchKey, $options: 'i' },
    userMail: { $ne: email }

  }

  try {
    const allBooks = await books.find(query)
    res.status(200).json(allBooks)
  } catch (err) {
    console.log(err)
  }
}

// view book 

exports.viewBookController = async (req, res) => {
  console.log("Inside view Book")
  const { id } = req.params
  try {
    const viewBook = await books.findById({ _id: id })
    res.status(200).json(viewBook)
  } catch (err) {
    console.log(err)
  }
}

// get all user books
exports.getAllUserBooks = async (req, res) => {
  console.log("Inside get all user books")
  const email = req.payload

  try {
    const allUserBooks = await books.find({ userMail: email })
    res.status(200).json(allUserBooks)
  } catch (err) {
    console.log(err)
  }
}

// get all user bought books
exports.getAllUserBoughtBooks = async (req, res) => {
  console.log("Inside get all user books")
  const email = req.payload

  try {
    const allUserBoughtBooks = await books.find({ bought: email })
    res.status(200).json(allUserBoughtBooks)
  } catch (err) {
    console.log(err)
  }
}

// remove user uploaded book

exports.deleteUserBook = async (req, res) => {
  console.log("Inside delete user book")
  const { id } = req.params
  console.log(id)

  try {
    await books.findByIdAndDelete({ _id: id })
    res.status(200).json("Deleted successfully!")
  }
  catch (err) {
    res.status(500).json(err)
  }
}

// get all books in admin resource page
exports.getAllBooksAdmin = async (req, res) => {
  console.log("Inside get all books in admin")
  try {
    const allAdminBooks = await books.find()
    res.status(200).json(allAdminBooks)

  }
  catch (err) {
    res.status(500).json(err)

  }
}

// update book status
exports.approveBooks = async (req, res) => {
  console.log("Inside approve book")
  const { _id, title, author, noOfPages, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, status, userMail, bought } = req.body

  try {
    const approveBook = await books.findByIdAndUpdate({ _id },{title, author, noOfPages, imgUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, status:"approved", userMail, bought},{new:true})

    res.status(200).json(approveBook)


  } catch (err) {
    res.status(500).json("Something went wrong", err)
  }
}



