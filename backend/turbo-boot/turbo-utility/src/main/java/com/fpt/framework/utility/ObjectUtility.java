package com.fpt.framework.utility;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.SerializationUtils;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ObjectUtility {

    private static final Map<ObjectType, ObjectType.ObjectIteratorFunction> objectResolverMap = new ConcurrentHashMap<>();
    private static final Map<ObjectType, ObjectType.ObjectWriterFunction> objectWriterMap = new ConcurrentHashMap<>();
    private static final String ATTRIBUTE_TOKEN_PATTERN = "\\s*(?<attributePath>(?<mapOperator>get\\(\\s*('|\\\")(?<mapKey>[^\\\"']+)('|\\\")\\s*\\))|(\\[\\s*(?<arrayIndex>(\\d+|\\*))\\s*\\])|([\\w\\-\\_]+))(?<separator>\\.?)\\s*";


    public static <T> T resolveObjectTemplate(T template, Map<String, Object> value){
        T resolvedValue = template;
        if(template instanceof HashMap<?, ?> templateObject){
            Map<String, Object> templateMap= (Map<String, Object>) SerializationUtils.clone(templateObject);
            Set<String> keys = templateMap.keySet();
            for(String key: keys){
                Object templateValue = templateObject.get(key);
                Object resolvedChildValue = resolveObjectTemplate(templateValue, value);
                templateMap.put(key, resolvedChildValue);
            }
            resolvedValue = (T) templateMap;
        }else if(template instanceof String){
            String templateValue = (String) template;
            resolvedValue = (T) resolveTemplate(templateValue, value);
        }
        return resolvedValue;
    }

    private static Object resolveTemplate(String templateValue, Map<String, Object> value) {
        String resolveValue = templateValue;
        if(Objects.nonNull(templateValue) && Objects.nonNull(value)){
            Pattern tokenTemplate = Pattern.compile(String.format("\\$\\{(?<attribute>(%s)+)\\}",ATTRIBUTE_TOKEN_PATTERN));
            Matcher matcher = tokenTemplate.matcher(templateValue);
            while (matcher.find()){
                String attributePath = matcher.group("attribute");
                Object replaceObject = readAttributeByPath(value, attributePath);
                String replaceValue = null;
                if(Objects.nonNull(replaceObject)){
                    replaceValue = replaceObject.toString();
                }

                if(Objects.nonNull(replaceValue)){
                    resolveValue = resolveValue.replaceAll(String.format("\\$\\{%s\\}",attributePath),replaceValue);
                }
            }
        }
        return resolveValue;
    }

    public static <T> T readAttributeByPath(Object sourceObject, String path){
        return (T) readAttributeByPath(sourceObject, path, true);
    }

    public static Object readAttributeByPath(Object sourceObject, String path, boolean enableReflection){
        Object resolvedValue = sourceObject;
        if(Objects.nonNull(path) && !path.isBlank() && Objects.nonNull(sourceObject)){
            resolvedValue = resolveObjectValue(sourceObject,path, enableReflection);
            if(path.contains(".")){
                String remainPath = path.replaceFirst(ATTRIBUTE_TOKEN_PATTERN,"");
                if(!remainPath.isBlank()){
                    resolvedValue = readAttributeByPath(resolvedValue, remainPath, enableReflection);
                }
            }
        }
        return resolvedValue;
    }

    public static void writeAttributeByPath(Object sourceObject, String path, Object value){
        writeAttributeByPath(sourceObject, path, value, true);
    }

    public static void writeAttributeByPath(Object sourceObject, String path, Object value, boolean enableReflection){
        if(Objects.nonNull(sourceObject)){
            if(Objects.nonNull(path) && !path.isBlank()){
                String lastAttributeToken = getLastAttributeName(path);
                String lastElementPattern = String.format(".?%s$",ATTRIBUTE_TOKEN_PATTERN);
                String remainPath = path.replaceAll(lastElementPattern,"");
                if(!remainPath.isBlank()){
                    Object childObject = readAttributeByPath(sourceObject, remainPath, enableReflection);
                    writeObjectValue(childObject, value,lastAttributeToken,enableReflection);
                }else{
                    writeObjectValue(sourceObject, value,lastAttributeToken,enableReflection);
                }
            }else{
                mergeObject(sourceObject, value);
            }
        }
    }

    public static void mergeObject(Object sourceObject, Object mergeObject) {
        boolean validMergeObject = Objects.nonNull(sourceObject) && Objects.nonNull(mergeObject);
        boolean isMergeMapObject = sourceObject instanceof  Map && mergeObject instanceof Map;
        if(validMergeObject && isMergeMapObject){
            Map<String, Object> sourceObjectMap = (Map<String, Object>) sourceObject;
            Map<String, Object> mergeObjectMap = (Map<String, Object>) mergeObject;
            Set<String> sourceKeys = sourceObjectMap.keySet();
            Set<String> mergeKeys = mergeObjectMap.keySet();
            Set<String> combinedKeys = new HashSet<>(sourceKeys);
            combinedKeys.addAll(mergeKeys);
            for(String key: combinedKeys){
                Object sourceChildValue = sourceObjectMap.get(key);
                Object mergeChildValue = mergeObjectMap.get(key);
                if(Objects.nonNull(sourceChildValue) && Objects.nonNull(mergeChildValue)){
                    if(sourceChildValue instanceof Map && mergeChildValue instanceof  Map){
                        mergeObject(sourceChildValue, mergeChildValue);
                    }else{
                        sourceObjectMap.put(key, mergeChildValue);
                    }
                }else if(Objects.nonNull(mergeChildValue)){
                    sourceObjectMap.put(key, mergeChildValue);
                }
            }
        }else{
            throw new RuntimeException("Invalid Object Type");
        }
    }

    private static void writeObjectValue(Object sourceObject, Object value, String key, boolean enableReflection) {
        if(Objects.nonNull(sourceObject) && Objects.nonNull(key)){
            if(sourceObject instanceof Collection<?>){
                objectWriterMap.get(ObjectType.COLLECTION).write(sourceObject, key, value);
            }else if(sourceObject instanceof Map<?,?>){
                objectWriterMap.get(ObjectType.MAP).write(sourceObject, key, value);
            }else if(enableReflection){
                objectWriterMap.get(ObjectType.OBJECT).write(sourceObject, key, value);
            }else{
                throw new RuntimeException("Invalid Object Type");
            }
        }
    }


    private static String getLastAttributeName(String path){
        String key = null;
        String lastElementPattern = String.format(".?%s$",ATTRIBUTE_TOKEN_PATTERN);
        Pattern pattern = Pattern.compile(lastElementPattern);
        Matcher matcher = pattern.matcher(path);
        if(matcher.find()){
            key = matcher.group("attributePath");
        }
        return key;
    }

    private static Object resolveObjectValue(Object sourceObject,String path, boolean enableReflection){
        Object resolvedValue = sourceObject;
        Pattern firstTokenPattern = Pattern.compile(ATTRIBUTE_TOKEN_PATTERN);
        Matcher matcher = firstTokenPattern.matcher(path);
        if(matcher.find()){
            String attributePath = matcher.group("attributePath");
            String arrayIndex = matcher.group("arrayIndex");
            String mapKey = matcher.group("mapKey");
            if(Objects.nonNull(arrayIndex) && sourceObject instanceof Collection<?>){
                resolvedValue = objectResolverMap.get(ObjectType.COLLECTION).resolve(sourceObject, arrayIndex);
            }
            else if(Objects.nonNull(mapKey) && sourceObject instanceof Map){
                resolvedValue = objectResolverMap.get(ObjectType.MAP).resolve(sourceObject, mapKey);
            }
            else if(Objects.nonNull(attributePath)){
                if(sourceObject instanceof Map){
                    resolvedValue = objectResolverMap.get(ObjectType.MAP).resolve(sourceObject, attributePath);
                }else if(enableReflection){
                    resolvedValue = objectResolverMap.get(ObjectType.OBJECT).resolve(sourceObject, attributePath);
                }else{
                    throw new RuntimeException("Invalid Object Type");
                }
            }
            else{
                throw new RuntimeException("Invalid Object Type");
            }
        }
        return resolvedValue;
    }

    static {
        objectResolverMap.put(ObjectType.OBJECT,(sourceObject, key)->{
            Class<?> clazz = sourceObject.getClass();
            try{
                Field field = clazz.getField(key);
                field.setAccessible(true);
                return field.get(sourceObject);
            }catch(NoSuchFieldException|IllegalAccessException e){
                throw new RuntimeException("Invalid Object Type", e);
            }
        });
        objectResolverMap.put(ObjectType.MAP,(sourceObject, key)->{
            if(sourceObject instanceof Map<?, ?> mapObject){
                return mapObject.get(key);
            }
            throw new RuntimeException("Invalid Object Type");
        });
        objectResolverMap.put(ObjectType.COLLECTION,(sourceObject, key)->{
            int index = -1;
            try{
                index = Integer.parseInt(key);
            }catch(NumberFormatException e){
                throw new RuntimeException("Invalid Attribute path", e);
            }
            if(sourceObject instanceof Collection<?> listObject){
                if( listObject.size() > index ){
                    return listObject.toArray()[index];
                }
            }
            throw new RuntimeException("Invalid Attribute path");
        });


        objectWriterMap.put(ObjectType.OBJECT,(sourceObject, key, value)->{
            Class<?> clazz = sourceObject.getClass();
            try{
                Field field = clazz.getField(key);
                field.setAccessible(true);
                field.set(sourceObject, value);
            }catch(NoSuchFieldException|IllegalAccessException e){
                throw new RuntimeException("Invalid Object Type", e);
            }
            return sourceObject;
        });
        objectWriterMap.put(ObjectType.MAP,(sourceObject, key, value)->{
            if(sourceObject instanceof Map<?, ?> ){
                Map<String, Object> mapObject = (Map<String, Object>) sourceObject;
                mapObject.put(key, value);
                return sourceObject;
            }
            throw new RuntimeException("Invalid Object Type");
        });
        objectWriterMap.put(ObjectType.COLLECTION,(sourceObject, key, value)->{
            if(sourceObject instanceof List<?>){
                List<Object> listObject = (List<Object>) sourceObject;
                if("*".equals(key)){
                    listObject.add(value);
                }else{
                    int index = Integer.parseInt(key);
                    if( listObject.size() > index ) {
                        listObject.add(index, value);
                    }
                }
                return sourceObject;
            }
            throw new RuntimeException("Invalid Attribute path");
        });
    }

    public static Object readAttribute(Object obj, String path) {
        try {
            return PropertyUtils.getNestedProperty(obj, path);
        } catch (Exception e) {
            throw new RuntimeException("Read attribute by path failed", e);
        }
    }

    public enum ObjectType{
        OBJECT,
        MAP,
        COLLECTION;

        @FunctionalInterface
        public interface ObjectIteratorFunction{
            Object resolve(Object sourceObject, String key);
        }



        @FunctionalInterface
        public interface ObjectWriterFunction{
            Object write(Object sourceObject, String key, Object value);
        }
    }
}
