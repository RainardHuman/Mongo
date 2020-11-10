let updatedDeals = {
    rfq: [],
    rfp: [],
    rfi: [],
    po: [],
    information: [],
    quote: [],
    proposal: [],
    invoice: []
};

// todo: ========================RETRIEVE========================
db.deals.find({ dealType: 'dealRfq' }).forEach(deal => {
    let type = '';
    let obj = {};
    switch (deal.dealType) {
        case 'dealRfq': obj = _rfq(deal); type = 'rfq'; break;
        // case 'dealRfp': obj = _rfp(deal); type = 'rfp'; break;
        // case 'dealRfi': obj = _rfi(deal); type = 'rfi'; break;
        // case 'dealPo': obj = _po(deal); type = 'po'; break;
        // case 'dealInformation': obj = _information(deal); type = 'information'; break;
        // case 'dealQuote': obj = _quote(deal); type = 'quote'; break;
        // case 'dealProposal': obj = _proposal(deal); type = 'proposal'; break;
        // case 'dealInvoice': obj = _invoice(deal); type = 'invoice'; break;
    };
    updatedDeals[type].push(_clean(obj));
});

// todo: ========================SAVING========================
_addToDB('rfq');
// _addToDB(rfp);
// _addToDB(rfi);
// _addToDB(po);
// _addToDB(information);
// _addToDB(quote);
// _addToDB(proposal);
// _addToDB(invoice);

// todo: ========================SCHEMAS========================
function _rfq(deal) {
    return {
        _id: deal._id,
        code: _isPopulated(deal.dealRfq, 'rfqNumber'),
        image: _isPopulated(_isPopulated(deal.dealRfq, 'rfqImage'), 'content'),
        recipients: _cleanArray(_isPopulated(deal, 'dealRecipients')),
        items: _items(_isPopulated(deal.dealRfq, 'rfqItems')),
        note: _isPopulated(deal.dealRfq, 'rfqNote'),
        industry: _isPopulated(deal.dealRfq, 'rfqIndustry'),
        document: _isPopulated(_isPopulated(deal.dealRfq, 'rfqDocumentation'), 'content'),
        address: _clean({
            short: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
            street: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'street'),
            city: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
            province: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
            country: _isPopulated(deal.dealRfq, 'rfqCountry'),
            code: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'postal'),
        }),
        meeting: _clean({
            time: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'meetingTime'),
            date: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'meetingDate'),
            short: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'short'),
            street: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'street'),
            city: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'administrativeTwo'),
            province: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'administrativeOne'),
        }),
        issueDate: _isPopulated(deal.dealRfq, 'rfqIssueDate'),
        expiryDate: _isPopulated(deal.dealRfq, 'rfqDeadlineDate'),
        updatedDate: _isPopulated(deal, 'dealLastUpdated'),
        publishDate: _isPopulated(deal, 'dealPublishDate'),
        lead: _isPopulated(deal, 'dealLead'),
        public: _isPopulated(deal, 'dealPublic'),
        stage: _isPopulated(deal, 'dealStage'),
        business: _clean({
            _id: _isPopulated(_isPopulated(deal, 'dealBusiness'), '_id'),
            image: _isPopulated(_isPopulated(_isPopulated(deal, 'dealBusiness'), 'businessImage'), 'content'),
            legalName: _isPopulated(_isPopulated(deal, 'dealBusiness'), 'businessLegalName'),
            regNumber: _isPopulated(_isPopulated(deal, 'dealBusiness'), 'businessRegistrationNumber'),
            vatNumber: _isPopulated(_isPopulated(deal, 'dealBusiness'), 'businessVatNumber'),
        }),
        user: _clean({
            _id: _isPopulated(_isPopulated(deal, 'dealUser'), '_id'),
            display: _isPopulated(_isPopulated(deal, 'dealUser'), 'userFirstName') + ' ' + _isPopulated(_isPopulated(deal, 'dealUser'), 'userLastName'),
            email: _isPopulated(_isPopulated(deal, 'dealUser'), 'userEmail'),
        })
    };
}

function _rfi(deal) {
    // return {}
}

function _po(deal) {
    // return {}
}

function _information(deal) {
    // return {}
}

function _quote(deal) {
    // return {}
}

function _proposal(deal) {
    // return {}
}

function _invoice(deal) {
    // return {}
}

// todo: ========================TOOLS========================
function _addToDB(col) {
    if (updatedDeals[col].length > 0)
        db.getSiblingDB('tradebrics_prod')[col].insertMany(updatedDeals[col]);
}

function _items(items) {
    let result = [];
    if (items.length > 0) {
        items.forEach(item => {
            result.push(_clean({
                ref: _isPopulated(item, 'itemRef'),
                name: _isPopulated(item, 'itemName'),
                quantity: _isPopulated(item, 'itemQuantity'),
                desc: _isPopulated(item, 'itemDescription'),
                price: _isPopulated(item, 'itemPrice'),
                discount: _isPopulated(item, 'itemDiscount'),
                tax: _isPopulated(item, 'itemTaxRate'),
                total: _isPopulated(item, 'itemTotalAmount'),
            }));
        });

        return result;
    }
    return null;
}

function _taxItems(items) {
    let result = [];
    if (items.length > 0) {
        items.forEach(item => {
            result.push(_clean({
                tax: _isPopulated(item, 'taxAmount'),
                rate: _isPopulated(item, 'taxRate'),
            }));
        });

        return result;
    }
    return null;
}

function _infoItems(items) {
    let result = [];
    if (items.length > 0) {
        items.forEach(item => {
            result.push(_clean({
                desc: _isPopulated(item, 'itemDescription'),
                file: _isPopulated(_isPopulated(item, 'itemFile'), 'content'),
                name: _isPopulated(item, 'itemName'),
            }));
        });

        return result;
    }
    return null;
}

function _clean(obj) {
    let temp = {};
    for (let prop in obj) {
        if (obj[prop] !== null) {
            temp[prop] = obj[prop];
        }
    }

    for (let prop in temp) {
        return temp;
    }
    return null;
}

function _cleanArray(arr) {
    if (arr)
        if (arr.length > 0)
            return arr;

    return null;
}

function _isPopulated(obj, key) {
    if (obj === null) {
        return null;
    }
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    return null;
}
