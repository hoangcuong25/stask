package com.fpt.framework.utility;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.config.BeanExpressionContext;
import org.springframework.beans.factory.config.BeanExpressionResolver;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.expression.StandardBeanExpressionResolver;

import java.util.Iterator;
import java.util.List;

public class ExpressionBeanResolver implements ApplicationContextAware {

    private BeanExpressionResolver resolver = new StandardBeanExpressionResolver();

    private BeanExpressionContext expressionContext;

    private BeanFactory beanFactory;

    private ApplicationContext applicationContext;

    public Object resolveExpression(String value) {
        return this.resolver.evaluate(this.resolve(value), this.expressionContext);
    }

    private String resolve(String value) {
        BeanFactory beanFactory = this.beanFactory;
        if (beanFactory instanceof ConfigurableBeanFactory cbf) {
            return cbf.resolveEmbeddedValue(value);
        } else {
            return value;
        }
    }

    public void resolveAsString(Object resolvedValue, List<String> result) {
        if (resolvedValue instanceof String[] strArr) {
            int length = strArr.length;

            for(int i = 0; i < length; i++) {
                Object object = strArr[length];
                this.resolveAsString(object, result);
            }
        } else if (resolvedValue instanceof String str) {
            result.add(str);
        } else {
            if (!(resolvedValue instanceof Iterable)) {
                throw new IllegalArgumentException(String.format("can't resolve '%s' as a String", resolvedValue));
            }

            Iterator iterator = ((Iterable)resolvedValue).iterator();

            while(iterator.hasNext()) {
                Object object = iterator.next();
                this.resolveAsString(object, result);
            }
        }

    }

    public synchronized void setBeanFactory(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
        if (beanFactory instanceof ConfigurableListableBeanFactory clbf) {
            this.resolver = clbf.getBeanExpressionResolver();
            this.expressionContext = new BeanExpressionContext((ConfigurableListableBeanFactory)beanFactory, null);
        }

    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        if (applicationContext instanceof ConfigurableApplicationContext cac) {
            this.setBeanFactory(cac.getBeanFactory());
        } else {
            this.setBeanFactory(applicationContext);
        }
    }
}
