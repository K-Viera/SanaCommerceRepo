using HotChocolate.Types;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL.Types;
public class CreateOrderRequestType : InputObjectType<CreateOrderRequest>
{
    protected override void Configure(IInputObjectTypeDescriptor<CreateOrderRequest> descriptor)
    {
        descriptor.Field(f => f.OrderLines).Type<NonNullType<ListType<NonNullType<OrderLineType>>>>();
        descriptor.Field(f => f.CustomerEmail).Type<StringType>();
        descriptor.Field(f => f.FirstName).Type<StringType>();
        descriptor.Field(f => f.LastName).Type<StringType>();
    }
}

public class OrderLineType : InputObjectType<OrderLine>
{
    protected override void Configure(IInputObjectTypeDescriptor<OrderLine> descriptor)
    {
        descriptor.Field(f => f.ProductId).Type<NonNullType<IntType>>();
        descriptor.Field(f => f.Quantity).Type<NonNullType<IntType>>();
    }
}

public class CreateOrderResponseType : ObjectType<CreateOrderResponse>
{
    protected override void Configure(IObjectTypeDescriptor<CreateOrderResponse> descriptor)
    {
        descriptor.Field(f => f.OrderId).Type<NonNullType<IntType>>();
        descriptor.Field(f => f.CustomerId).Type<NonNullType<IntType>>();
        descriptor.Field(f => f.OrderDate).Type<NonNullType<DateTimeType>>();
    }
}

public class CreateOrderRequest
{
    public string CustomerEmail { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public List<OrderLine> OrderLines { get; set; } = null!;
}
public class OrderLine
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
