function deepCopy(obj, copies = new WeakMap()) {
    // Если obj является null, undefined, не объектом или функцией, возвращаем его
    if (obj === null || typeof obj !== 'object' || typeof obj === 'function') {
      return obj;
    }
    
    // Проверяем, не был ли объект уже скопирован
    if (copies.has(obj)) {
      return copies.get(obj);
    }
    
    // Создаем новый объект или массив в зависимости от типа obj
    let newObj = Array.isArray(obj) ? [] : {};
    
    // Запоминаем новый объект в copies, чтобы избежать циклических ссылок
    copies.set(obj, newObj);
    
    // Рекурсивно копируем свойства из obj в newObj
    for (let key in obj) {
      // Проверяем, что свойство является собственным (не унаследованным)
      if (obj.hasOwnProperty(key)) {
        // Рекурсивно вызываем deepCopy для каждого свойства объекта
        newObj[key] = deepCopy(obj[key], copies);
      }
    }
    
    // Возвращаем новую глубокую копию объекта
    return newObj;
  }
  
  // Пример использования
  let originalObj = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4],
      e: {
        f: 5
      }
    }
  };
  
  // Делаем глубокую копию
  let copiedObj = deepCopy(originalObj);
  
  // Вносим изменения в копию
  copiedObj.b.c = 10;
  copiedObj.b.d.push(20);
  copiedObj.b.e.f = 30;
  
  // Выводим исходный объект и его копию
  console.log("Original Object:", originalObj);
  console.log("Copied Object:", copiedObj);
  