require('should');
const zlotygroszy = require('../zlotygroszy')

describe('zlotygroszy', function () {

    it ("should convert numbers to złotych in words", function () {
        zlotygroszy('111').should.equal('sto jedenaście złotych');
        zlotygroszy('10,00').should.equal('dziesięć złotych');
        zlotygroszy('95 000').should.equal('dziewięćdziesiąt pięć tysięcy złotych');
        zlotygroszy('86.230.450').should.equal('osiemdziesiąt sześć milionów dwieście trzydzieści tysięcy czterysta pięćdziesiąt złotych');
    });

    it ("should convert numbers to groszy in words", function () {
        zlotygroszy('0,01').should.equal('jeden groszy');
        zlotygroszy(',95').should.equal('dziewięćdziesiąt pięć groszy');
        zlotygroszy('00,59').should.equal('pięćdziesiąt dziewięć groszy');
    });

    it ("should convert numbers to złotych and groszy in words", function () {
        zlotygroszy('1,01').should.equal('jeden złotych i jeden groszy');
        zlotygroszy('-2,01').should.equal('minus dwa złotych i jeden groszy')
        zlotygroszy('20,21').should.equal('dwadzieścia złotych i dwadzieścia jeden groszy');
        zlotygroszy('123008,56').should.equal('sto dwadzieścia trzy tysiące osiem złotych i pięćdziesiąt sześć groszy');
    });

    it ("should hit edge cases and survive", function () {
        zlotygroszy('1000000000,56').should.equal('zbyt dużo');
        zlotygroszy('1,121').should.equal('zbyt dużo groszy');
    });

});