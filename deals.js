let updatedDeals = {
    rfq: [],
    rfp: [],
    rfi: [],
    po: [],
    information: [],
    quote: [],
    proposal: [],
    invoice: [],
    other: []
};

// todo: ========================RETRIEVE========================
db.deals.find({}).forEach(deal => {
    let type = '';
    let obj = {};
    switch (deal.dealType) {
        case 'dealRfq': obj = _rfq(deal); type = 'rfq'; break;
        case 'dealRfp': obj = _rfp(deal); type = 'rfp'; break;
        case 'dealRfi': obj = _rfi(deal); type = 'rfi'; break;
        case 'dealPo': obj = _po(deal); type = 'po'; break;
        case 'dealInformation': obj = _information(deal); type = 'information'; break;
        case 'dealQuote': obj = _quote(deal); type = 'quote'; break;
        case 'dealProposal': obj = _proposal(deal); type = 'proposal'; break;
        case 'dealInvoice': obj = _invoice(deal); type = 'invoice'; break;
        default: obj = deal; type = 'other'; break;
    };
    updatedDeals[type].push(_clean(obj));
});

// todo: ========================SAVING========================
_addToDB('rfq');
_addToDB('rfp');
_addToDB('rfi');
_addToDB('po');
_addToDB('information');
_addToDB('quote');
_addToDB('proposal');
_addToDB('invoice');

// todo: ========================SCHEMAS========================
function _rfq(deal) {
    let rfq = {};
    _mergeSchemas(rfq, _buildRefDetials(deal,'rfq'));
    rfq.image = _isPopulated(_isPopulated(deal.dealRfq, 'rfqImage'), 'content');
    rfq.items = _items(_isPopulated(deal.dealRfq, 'rfqItems'));
    rfq.note = _isPopulated(deal.dealRfq, 'rfqNote');
    rfq.industry = _isPopulated(deal.dealRfq, 'rfqIndustry');
    rfq.document = _isPopulated(_isPopulated(deal.dealRfq, 'rfqDocumentation'), 'content');
    rfq.address = _clean({
        short: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
        street: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'street'),
        city: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
        province: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'short'),
        country: _isPopulated(deal.dealRfq, 'rfqCountry'),
        code: _isPopulated(_isPopulated(deal.dealRfq, 'rfqAddress'), 'postal'),
    });
    rfq.meeting = _clean({
        time: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'meetingTime'),
        date: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'meetingDate'),
        short: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'short'),
        street: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'street'),
        city: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'administrativeTwo'),
        province: _isPopulated(_isPopulated(deal.dealRfq, 'rfqBriefingMeeting'), 'administrativeOne'),
    });
    rfq.issueDate = _isPopulated(deal.dealRfq, 'rfqIssueDate');
    rfq.expiryDate = _isPopulated(deal.dealRfq, 'rfqDeadlineDate');
    _mergeSchemas(rfq, _buildDetials(deal));

    return rfq;
}

function _rfp(deal) {
    let rfp = {};
    _mergeSchemas(rfp, _buildRefDetials(deal,'rfp'));
    rfp.meeting = _clean({
        time: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'meetingTime'),
        date: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'meetingDate'),
        short: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'short'),
        street: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'street'),
        city: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'administrativeTwo'),
        province: _isPopulated(_isPopulated(deal.dealRfp, 'rfpBriefingMeeting'), 'administrativeOne'),
    });
    rfp.introduction = _isPopulated(deal.dealRfp, 'rfpIntroduction');
    rfp.industry = _isPopulated(deal.dealRfp, 'rfpIndustry');
    rfp.questionnaire = _isPopulated(deal.dealRfp, 'rfpQuestionnaire');
    rfp.document = _isPopulated(_isPopulated(deal.dealRfp, 'rfpDocumentation'), 'content');
    rfp.address = _clean({
        country: _isPopulated(deal.dealRfp, 'rfpCountry'),
    });
    rfp.issueDate = _isPopulated(deal.dealRfp, 'rfpIssueDate');
    rfp.expiryDate = _isPopulated(deal.dealRfp, 'rfpDeadlineDate');
    _mergeSchemas(rfp, _buildDetials(deal));

    return rfp;
}

function _rfi(deal) {
    let rfi = {};
    _mergeSchemas(rfi, _buildRefDetials(deal,'rfi'));
    rfi.desc = _isPopulated(deal.dealRfi, 'rfiDescription');
    rfi.industry = _isPopulated(deal.dealRfi, 'rfiIndustry');
    rfi.document = _isPopulated(_isPopulated(deal.dealRfi, 'rfiDocumentation'), 'content');
    rfi.address = _clean({
        country: _isPopulated(deal.dealRfi, 'rfiCountry'),
    });
    rfi.issueDate = _isPopulated(deal.dealRfi, 'rfiIssueDate');
    rfi.expiryDate = _isPopulated(deal.dealRfi, 'rfiDeadlineDate');
    _mergeSchemas(rfi, _buildDetials(deal));

    return rfi;
}

function _po(deal) {
    let po = {};
    _mergeSchemas(po, _buildRefDetials(deal,'po'));
    po.items = _items(_isPopulated(deal.dealPo, 'poItems'));
    po.currency = _isPopulated(deal.dealPo, 'poCurrency');
    po.discount = _isPopulated(deal.dealPo, 'poDiscount');
    po.subTotal = _isPopulated(deal.dealPo, 'poSubTotal');
    po.total = _isPopulated(deal.dealPo, 'poGrandTotal');
    po.terms = _isPopulated(deal.dealPo, 'poTerms');
    po.document = _isPopulated(_isPopulated(deal.dealPo, 'poDocumentation'), 'content');
    po.issueDate = _isPopulated(deal.dealPo, 'poIssueDate');
    po.expiryDate = _isPopulated(deal.dealPo, 'poDeadlineDate');
    _mergeSchemas(po, _buildDetials(deal));

    return po;
}

function _information(deal) {
    let information = {};
    _mergeSchemas(information, _buildRefDetials(deal,'information'));
    information.items = _infoItems(_isPopulated(deal.dealInformation, 'informationItems'));
    information.note = _isPopulated(deal.dealInformation, 'informationNote');
    information.industry = _isPopulated(deal.dealInformation, 'informationIndustry');
    information.address = _clean({
        country: _isPopulated(deal.dealInformation, 'information,Country'),
    });
    information.issueDate = _isPopulated(deal.dealInformation, 'informationIssueDate');
    _mergeSchemas(information, _buildDetials(deal));

    return information;
}

function _quote(deal) {
    let quote = {};
    _mergeSchemas(quote, _buildRefDetials(deal,'quote'));
    quote.currency = _isPopulated(deal.dealQuote, 'quoteCurrency');
    quote.terms = _isPopulated(deal.dealQuote, 'quoteTerms');
    quote.discount = _isPopulated(deal.dealQuote, 'quoteDiscount');
    quote.subTotal = _isPopulated(deal.dealQuote, 'quoteSubTotal');
    quote.total = _isPopulated(deal.dealQuote, 'quoteGrandTotal');
    quote.items = _items(_isPopulated(deal.dealQuote, 'quoteItems'));
    quote.taxItems =  _taxItems(_isPopulated(deal.dealQuote, 'quoteTaxItems'));
    quote.document = _isPopulated(_isPopulated(deal.dealQuote, 'rfpDocumentation'), 'content');
    quote.address = _clean({
        country: _isPopulated(deal.dealQuote, 'rfpCountry'),
    });
    quote.issueDate = _isPopulated(deal.dealQuote, 'rfpIssueDate');
    quote.expiryDate = _isPopulated(deal.dealQuote, 'rfpDeadlineDate');
    _mergeSchemas(quote, _buildDetials(deal));

    return quote;
}

function _proposal(deal) {
    let proposal = {};
    _mergeSchemas(proposal, _buildRefDetials(deal,'proposal'));
    proposal.introduction = _isPopulated(deal.dealProposal, 'proposalIntroduction');
    proposal.industry = _isPopulated(deal.dealProposal, 'proposalIndustry');
    proposal.document = _isPopulated(_isPopulated(deal.dealProposal, 'proposalDocumentation'), 'content');
    proposal.address = _clean({
        country: _isPopulated(deal.dealProposal, 'proposalCountry'),
    });
    _mergeSchemas(proposal, _buildDetials(deal));

    return proposal;
}

function _invoice(deal) {
    let invoice = {};
    _mergeSchemas(invoice, _buildRefDetials(deal,'invoice'));
    invoice.currency = _isPopulated(deal.dealInvoice, 'invoiceCurrency');
    invoice.terms = _isPopulated(deal.dealInvoice, 'invoiceTerms');
    invoice.subTotal = _isPopulated(deal.dealInvoice, 'invoiceSubTotal');
    invoice.total = _isPopulated(deal.dealInvoice, 'invoiceGrandTotal');
    invoice.items = _items(_isPopulated(deal.dealInvoice, 'invoiceItems'));
    invoice.taxItems =  _taxItems(_isPopulated(deal.dealInvoice, 'invoiceTaxItems'));
    invoice.document = _isPopulated(_isPopulated(deal.dealInvoice, 'invoiceDocumentation'), 'content');
    invoice.issueDate = _isPopulated(deal.dealInvoice, 'invoiceIssueDate');
    invoice.expiryDate = _isPopulated(deal.dealInvoice, 'invoiceDeadlineDate');
    _mergeSchemas(invoice, _buildDetials(deal));
    
    return invoice;
}

// todo: ========================TOOLS========================
function _addToDB(col) {
    if (updatedDeals[col].length > 0){
        db.getSiblingDB('tradebrics_prod').createCollection(col);
        db.getSiblingDB('tradebrics_prod')[col].insertMany(updatedDeals[col]);
    }
        
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

    if(Object.keys(temp).length > 0)
        return temp;
    
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

// todo: ========================SCHEMA TOOLS========================

function _mergeSchemas(objFinal, objMerge) {
    for (const key in objMerge) {
        objFinal[key] = objMerge[key];
    }
    return objFinal;
}

function _buildRefDetials(deal,code){
    const type = 'deal' + code.charAt(0).toUpperCase() + code.slice(1);
    code = code + 'Number';
    return {
        _id: deal._id,
        code: _isPopulated(deal[type], code),
        recipients: _cleanArray(_isPopulated(deal, 'dealRecipients'))
    }
}

function _buildDetials(deal){
    return {
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
    }
}
