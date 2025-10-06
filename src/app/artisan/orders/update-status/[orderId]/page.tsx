
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Package, Ship, CheckCircle } from 'lucide-react';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { translateText } from '@/services/translation-service';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';
interface MyOrder extends Product {
  quantity: number;
  status: OrderStatus;
  orderDate: string;
}

const updateStatusSchema = z.object({
  status: z.enum(['Processing', 'Shipped', 'Delivered']),
});

export default function UpdateStatusPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const orderId = params.orderId as string;
  const { language } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<MyOrder | null>(null);

  const [translatedContent, setTranslatedContent] = useState({
    title: 'Update Order Status',
    description: 'Update the status for order #',
    selectStatusTitle: 'Select New Status',
    selectStatusDescription: 'Choose the current stage of the order fulfillment.',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    updateButton: 'Update Status',
    statusUpdatedToast: 'Status Updated!',
    statusUpdatedToastDesc: 'Order status has been changed to "{status}".',
    orderNotFoundToast: 'Order not found',
    quantity: 'Quantity'
  });

  const form = useForm<z.infer<typeof updateStatusSchema>>({
    resolver: zodResolver(updateStatusSchema),
  });
  
  useEffect(() => {
    const translate = async () => {
      if (language !== 'en') {
        const values = Object.values(translatedContent);
        const { translatedTexts } = await translateText({ texts: values, targetLanguage: language });
        const newContent: any = {};
        Object.keys(translatedContent).forEach((key, index) => {
          newContent[key] = translatedTexts[index];
        });
        setTranslatedContent(newContent);
      }
    };
    translate();
  }, [language]);

  useEffect(() => {
    if (orderId) {
      const myOrders: MyOrder[] = JSON.parse(localStorage.getItem('myOrders') || '[]');
      const currentOrder = myOrders.find(o => o.id === orderId);
      if (currentOrder) {
        setOrder(currentOrder);
        form.setValue('status', currentOrder.status);
      } else {
        toast({
            variant: "destructive",
            title: translatedContent.orderNotFoundToast,
        })
        router.back();
      }
    }
  }, [orderId, form, router, toast, translatedContent.orderNotFoundToast]);

  function onSubmit(values: z.infer<typeof updateStatusSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const myOrders: MyOrder[] = JSON.parse(localStorage.getItem('myOrders') || '[]');
      const updatedOrders = myOrders.map(o => 
        o.id === orderId ? { ...o, status: values.status } : o
      );
      localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
      
      setIsLoading(false);
      toast({
        title: translatedContent.statusUpdatedToast,
        description: translatedContent.statusUpdatedToastDesc.replace('{status}', values.status),
      });
      router.push('/artisan/orders');
    }, 1000);
  }

  if (!order) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-xl">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">{translatedContent.title}</h1>
        <p className="text-muted-foreground">{translatedContent.description}{order.id}.</p>
      </header>
        <Card className="mb-8">
            <CardContent className="p-4 flex gap-4 items-center">
                <Image src={order.image.url} alt={order.name} width={80} height={80} className="rounded-md object-cover aspect-square"/>
                <div>
                    <h2 className="font-bold">{order.name}</h2>
                    <p className="text-sm text-muted-foreground">{translatedContent.quantity}: {order.quantity}</p>
                </div>
            </CardContent>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>{translatedContent.selectStatusTitle}</CardTitle>
          <CardDescription>{translatedContent.selectStatusDescription}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent has-[:checked]:bg-accent">
                          <FormControl>
                            <RadioGroupItem value="Processing" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2 cursor-pointer w-full">
                            <Package className="h-5 w-5 text-yellow-600" />
                            {translatedContent.processing}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent has-[:checked]:bg-accent">
                          <FormControl>
                            <RadioGroupItem value="Shipped" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2 cursor-pointer w-full">
                            <Ship className="h-5 w-5 text-blue-600" />
                            {translatedContent.shipped}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent has-[:checked]:bg-accent">
                          <FormControl>
                            <RadioGroupItem value="Delivered" />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2 cursor-pointer w-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            {translatedContent.delivered}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {translatedContent.updateButton}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}

    