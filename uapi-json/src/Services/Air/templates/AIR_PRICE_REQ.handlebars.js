module.exports = `
<!--Release 8.1-->
<!--Version Dated as of 15/Apr/2015 11:24:06-->
<!--Air Pricing For Galileo({{provider}}) with LFS CheckFlightDetails Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <air:AirPriceReq
            AuthorizedBy="user" CheckFlightDetails="true" TargetBranch="{{TargetBranch}}"
            TraceId="mastermind"
            {{#if fetchFareRules}}
            FareRuleType="{{#if long}}long{{else}}short{{/if}}"
            {{/if}}
            FareRuleType="Long"
            xmlns:air="http://www.travelport.com/schema/air_v47_0"
            xmlns:com="http://www.travelport.com/schema/common_v47_0">
            <com:BillingPointOfSaleInfo OriginApplication="UAPI" xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
            <air:AirItinerary>
                {{#segments}}
                <air:AirSegment ArrivalTime="{{arrival}}"
                                DepartureTime="{{departure}}"
                                Carrier="{{airline}}"
                                CabinClass="{{serviceClass}}"
                                Origin="{{from}}"
                                Destination="{{to}}"
                                ETicketability="Yes"
                                Equipment="{{plane}}"
                                FlightNumber="{{flightNumber}}"
                                LinkAvailability="true"
                                PolledAvailabilityOption="{{PolledAvailabilityOption}}"
                                ProviderCode="{{../provider}}"
                                FlightTime="{{FlightTime}}"
                                Distance="{{Distance}}"
                                ChangeOfPlane="{{ChangeOfPlane}}"
                                ParticipantLevel="{{ParticipantLevel}}"
                                OptionalServicesIndicator="{{OptionalServicesIndicator}}"
                                AvailabilityDisplayType="{{AvailabilityDisplayType}}"
                                AvailabilitySource="{{AvailabilitySource}}"
                                Key="{{@index}}"
                                Group="{{group}}">

                    {{#if transfer}}
                    <air:Connection/>
                    {{/if}}
                </air:AirSegment>
                {{/segments}}
            </air:AirItinerary>
            {{#if business}}
            <air:AirPricingModifiers FaresIndicator="PublicFaresOnly" PlatingCarrier="{{platingCarrier}}" InventoryRequestType="DirectAccess">
                <air:PermittedCabins>
                    <com:CabinClass Type="Business" xmlns:com="http://www.travelport.com/schema/common_v47_0" />
                </air:PermittedCabins>
            </air:AirPricingModifiers>
            {{else}}
            <air:AirPricingModifiers FaresIndicator = "PublicFaresOnly" PlatingCarrier="{{platingCarrier}}" InventoryRequestType="DirectAccess"/>
            {{/if}}
            {{#passengers}}
            <com:SearchPassenger 
                BookingTravelerRef="mastermind_{{@index}}" 
                Code="{{ageCategory}}" 
                {{#if Age}}Age="{{Age}}"{{/if}} 
                xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
            {{/passengers}}
            <air:AirPricingCommand>
                {{#segments}}
                <air:AirSegmentPricingModifiers AirSegmentRef="{{@index}}">
                {{#if bookingClass}}
                    <air:PermittedBookingCodes>
                            <air:BookingCode Code="{{bookingClass}}" />
                    </air:PermittedBookingCodes>
                {{/if}}
                </air:AirSegmentPricingModifiers>
                {{/segments}}
            </air:AirPricingCommand>
            {{#if emulatePcc}}
            <air:PCC>
                <com:OverridePCC ProviderCode="{{provider}}" PseudoCityCode="{{emulatePcc}}"/>
            </air:PCC>
            {{/if}}
        </air:AirPriceReq>
    </soap:Body>
</soap:Envelope>
`;