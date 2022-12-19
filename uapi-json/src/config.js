function urls(region, production = false) {
    const prefix = production ? '' : 'pp.';
    const timeout = production ? 20000 : 90000;
    const url = `https://${region}.universal-api.${prefix}travelport.com/B2BGateway/connect/uAPI`;
    return {
        timeout,
        HotelsService: {
            url: `${url}/HotelService`,
        },
        AirService: {
            url: `${url}/AirService`,
        },
        FlightService: {
            url: `${url}/FlightService`,
        },
        UniversalRecord: {
            url: `${url}/UniversalRecordService`,
        },
        CurrencyConversion: {
            url: `${url}/CurrencyConversionService`,
        },
        GdsQueueService: {
            url: `${url}/GdsQueueService`,
        },
        TerminalService: {
            url: `${url}/TerminalService`,
        },
        UtilService: {
            url: `${url}/UtilService`,
        },
    };
}

module.exports = function(region = 'apac', production = false) {
    return urls(region, production);
};