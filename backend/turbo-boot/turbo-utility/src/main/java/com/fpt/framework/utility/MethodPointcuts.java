package com.fpt.framework.utility;

import org.aopalliance.intercept.MethodInvocation;
import org.reactivestreams.Publisher;
import org.springframework.aop.ClassFilter;
import org.springframework.aop.MethodMatcher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.support.ComposablePointcut;
import org.springframework.aop.support.Pointcuts;
import org.springframework.aop.support.annotation.AnnotationMatchingPointcut;
import org.springframework.core.ReactiveAdapter;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;
import reactor.core.CorePublisher;
import reactor.core.Exceptions;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.StringJoiner;
import java.util.function.Predicate;

public class MethodPointcuts {


    public static class MethodPublicMatcher implements MethodMatcher {

        private Predicate<Method>[] predicates;

        public MethodPublicMatcher(Predicate<Method>... predicates) {
            this.predicates = predicates;
        }

        @Override
        public boolean matches(Method method, Class<?> targetClass) {

            // only support for public method and return
            boolean isPublic = Modifier.isPublic(method.getModifiers());
            if (!isPublic) {
                return false;
            }
            if (null != predicates) {
                for (Predicate<Method> predicate : predicates) {
                    if (!predicate.test(method)) {
                        return false;
                    }
                }
            }
            return true;
        }

        @Override
        public boolean isRuntime() {
            return false;
        }

        @Override
        public boolean matches(Method method, Class<?> targetClass, Object... args) {
            return false;
        }
    }

    private static MethodMatcher REACTIVE_METHOD_MATCHER = new MethodPublicMatcher(method ->
            CorePublisher.class.isAssignableFrom(method.getReturnType()));

    @SafeVarargs
    public static Pointcut forAnnotations(Class<? extends Annotation>... annotations) {
        ComposablePointcut pointcut = null;
        Class[] clazz = annotations;
        int length = annotations.length;

        for (int i = 0; i < length; ++i) {
            Class<? extends Annotation> annotation = clazz[i];
            if (pointcut == null) {
                pointcut = new ComposablePointcut(classOrMethodHasAnnotation(annotation));
            } else {
                pointcut.union(classOrMethodHasAnnotation(annotation));
            }
        }

        return pointcut;
    }

    public static <T> T proceed(MethodInvocation mi) {
        try {
            return (T) mi.proceed();
        } catch (Throwable var2) {
            throw Exceptions.propagate(var2);
        }
    }

    public static boolean isMultiValue(Class<?> returnType, ReactiveAdapter adapter) {
        if (Flux.class.isAssignableFrom(returnType)) {
            return true;
        } else {
            return adapter != null && adapter.isMultiValue();
        }
    }

    private static Pointcut classOrMethodInPackage(String packageName) {
        Assert.notNull(packageName, "Could not found boot class");
        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return clazz -> clazz.getPackageName().startsWith(packageName);
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return REACTIVE_METHOD_MATCHER;
            }
        };
    }

    public static Pointcut classOrMethodInPackage(String packageName, Class<? extends Annotation> annotation) {
        Assert.notNull(packageName, "Could not found boot class");
        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return clazz -> clazz.getPackageName().startsWith(packageName)
                        && clazz.getAnnotation(annotation) != null;
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return REACTIVE_METHOD_MATCHER;
            }
        };
    }

    public static Pointcut forFieldHasAnnotation(Class annotation) {
        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return clazz -> {
                    Field[] fields = clazz.getDeclaredFields();
                    for (Field field : fields) {
                        if (null != field.getAnnotation(annotation)) {
                            return true;
                        }
                    }
                    return false;
                };
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return MethodPointcuts.REACTIVE_METHOD_MATCHER;
            }
        };
    }

    public static Object invokeMethod(Object object, String methodName, Object... args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Class[] argClasses = Arrays.stream(args).map(c -> c.getClass()).toArray(Class[]::new);
        Method method = ReflectionUtils.findMethod(object.getClass(), methodName, argClasses);
        method.setAccessible(true);
        return method.invoke(object, args);
    }

	public static Object invokeMethod(Object target, String methodName, Class<?>[] paramTypes, Object... args)
			throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
		Method m = findDeclaredMethodRecursive(target.getClass(), methodName, paramTypes);
		if (m == null) {
			throw new NoSuchMethodException(prettySig(target.getClass(), methodName, paramTypes) + " not found");
		}
		makeAccessible(m);
		return m.invoke(target, args);
	}

	private static Method findDeclaredMethodRecursive(Class<?> type, String name, Class<?>... paramTypes) {
		for (Class<?> c = type; c != null; c = c.getSuperclass()) {
			try {
				return c.getDeclaredMethod(name, paramTypes);
			} catch (NoSuchMethodException ignore) {}
		}
		return null;
	}

	private static void makeAccessible(Method m) {
		try {
			if (!m.canAccess(null)) {
				m.setAccessible(true);
			}
		} catch (Throwable ignored) {
			ReflectionUtils.makeAccessible(m);
		}
	}

	private static String prettySig(Class<?> type, String name, Class<?>[] pts) {
		StringJoiner sj = new StringJoiner(",", name + "(", ")");
		for (Class<?> p : pts) {
			sj.add(p.getSimpleName());
		}
		return type.getName() + "#" + sj;
	}

    public static Pointcut forMethodInClass(Class clazz, String... methodNames) {
        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return cl -> clazz.isAssignableFrom(cl);
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return new MethodPublicMatcher();
            }
        };
    }

    @SafeVarargs
    public static Pointcut forAnnotations(String packageName, Class<? extends Annotation>... annotations) {
        ComposablePointcut pointcut = null;
        Class[] clazz = annotations;
        int length = annotations.length;
        for (int i = 0; i < length; ++i) {
            Class<? extends Annotation> annotation = clazz[i];
            if (pointcut == null) {
                pointcut = new ComposablePointcut(classOrMethodInPackage(packageName, annotation));
            } else {
                pointcut.union(classOrMethodInPackage(packageName, annotation));
            }
        }
        return pointcut;
    }

    @SafeVarargs
    public static Pointcut forArgAnnotations(Class<? extends Annotation>... annotations) {
        ComposablePointcut pointcut = null;
        Class[] clazz = annotations;
        int length = annotations.length;
        for (int i = 0; i < length; ++i) {
            Class<? extends Annotation> annotation = clazz[i];
            if (pointcut == null) {
                pointcut = new ComposablePointcut(argumentsHasAnnotation(annotation));
            } else {
                pointcut.union(argumentsHasAnnotation(annotation));
            }
        }

        return pointcut;
    }

    private static Pointcut argumentsHasAnnotation(Class<? extends Annotation> annotation) {
        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return ClassFilter.TRUE;
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return new MethodMatcher() {
                    @Override
                    public boolean matches(Method method, Class<?> targetClass) {
                        for (Annotation[] paramAnnotations : method.getParameterAnnotations()) {
                            for (Annotation paramAnnotation : paramAnnotations) {
                                if (paramAnnotation.annotationType().equals(annotation)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }

                    @Override
                    public boolean isRuntime() {
                        return false;
                    }

                    @Override
                    public boolean matches(Method method, Class<?> targetClass, Object... args) {
                        return false;
                    }
                };
            }
        };
    }

    public static Pointcut forPackage(String packageName) {
        return classOrMethodInPackage(packageName);
    }

    @SafeVarargs
    public static Pointcut forReactiveAnnotations(Class<? extends Annotation>... annotations) {
        Pointcut annotationPointcut = forAnnotations(annotations);

        return new Pointcut() {
            @Override
            public ClassFilter getClassFilter() {
                return annotationPointcut.getClassFilter();
            }

            @Override
            public MethodMatcher getMethodMatcher() {
                return new MethodMatcher() {
                    @Override
                    public boolean matches(Method method, Class<?> targetClass) {
                        return annotationPointcut.getMethodMatcher().matches(method, targetClass)
                                && REACTIVE_METHOD_MATCHER.matches(method, targetClass);
                    }

                    @Override
                    public boolean isRuntime() {
                        return false;
                    }

                    @Override
                    public boolean matches(Method method, Class<?> targetClass, Object... args) {
                        return false;
                    }
                };
            }
        };
    }

    private static Pointcut classOrMethodHasAnnotation(Class<? extends Annotation> annotation) {
        return Pointcuts.union(new AnnotationMatchingPointcut((Class) null, annotation, true), new AnnotationMatchingPointcut(annotation, true));
    }

    public static Object adaptPublisher(ReactiveAdapter adapter, Publisher<?> result) {
        return adapter != null ? adapter.fromPublisher(result) : result;
    }

    private MethodPointcuts() {
    }
}
