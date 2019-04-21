const CronJob = require('cron').CronJob
const { nodemailer } = require('./helpers')
const { Product } = require('./models')

// let MailerJob = new CronJob('0 06 * * 1', function() {
let MailerJob = new CronJob('36 20 * * *', function() {
    let message = 'Your product stock information:\n'
    Product.find({})
        .then(products => {
            products.forEach(e => {
                if(e.amount > 10) {
                    message += `${e.name}: ${e.amount}\n`
                } else {
                    message += `${e.name}: ${e.amount} (Need restock)\n`
                }
            })
            nodemailer.Mailer('willyprayogo26@gmail.com', message)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = MailerJob