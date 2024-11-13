const QueueLoad = async () => {
    const getUploads = getQueue();
    if (getUploads && getUploads.length > 0) {
        getUploads.forEach((item, i) => {
            //上传中
            item.upLoadStatus = "upLoading";
            item.tags = lang.UPLOADING;
            uploadsQueue.set(item.uploadId, item);
            // edoc2upLoad.update({key: item.uploadId}, {$set: {upLoadStatus: "upLoading"}});

            // -------------- 不知道这里是不是异步 --------------
            callBack({
                key: 'update',
                data: item
            });
            if (!item.open) {
                console.log('opnFile')
                // 强制同步，当前循环结束才能接着遍历下一个对象
                // await 等待Promise.resolve 被调用才继续执行
                await opnFile(item);
            }
        });
    }

}
function opnFile(file) {
    // ---------------整个函数 用Promise 包起来 ------------------
    return new Promise((resolve, reject)=>{

        if (extraParams.strategy === 'skip') {
            QueueLoad();
            
            uploadsQueue.delete(file.key);
            // edoc2upLoad.remove({key: file.key});
            store.dispatch(deleteUploadItem(file.key));
            resolve();
            // 此处 return; 换成上面的resolve
            // return; 
        }

        // ----------------------- 异步 -----------------------
        fs.open(file.path, 'r', function (err, fd) {
            console.log('fd', fd)
            if (err) {
                let log = '\r\n open file ' + err
                addSystemLog(log)
                throw err;
            }
            let checkUri = getApiUrl('checkAndCreateDocInfo');
            let checkData = {
                folderId: file.parentId,
                folderName: file.parentName,
                token: getToken(),
                fileName: file.name ? file.name : file.fileMime.name,
                fileRemark: file.fileRemark,
                size: file.size,	   // 文件大小
                type: file.type ? file.type : file.fileMime.type,     // 文件contentType
                attachType: 0,       // 附件类型，现在只有0
                code: '',	        // 外发Code
                strategy: file.strategy,  // 策略
                fileModel: file.fileModel, // "UPDATE" or "UPLOAD"
                masterFileId: '', // 附件的主文件ID(如果上传的是附件)
                //uri:file.uri?file.uri:''
            }
            console.log('checkData', checkData)
            // 20139【517 - 引用文件】更新引用文件，没有对源文件进行更新
            if (fileObject && fileObject.docType == 32) {
                checkData.fileId = fileObject.linkId
            }
            if (file.shareId && file.shareId !== '') {
                checkData.shareId = file.shareId
            }
            if (file.shareUserId && file.shareUserId !== '') {
                checkData.shareUserId = file.shareUserId
            }

            checkData.fullPath = file.fullPathReq + "/";      // Web端文件夹上传用到
            // checkData.fullPath = encodeString(file.fullPathReq);      // Web端文件夹上传用到
            //判断是否续传
            console.log('zazi不是小于的吗？')
            console.log(file)
            console.log(file.uri)
            if (file.uri && file.hash) {   //我需要获取到file.uri和file.hash两个值
                file.uri = (getApiUrl('upFile', file.regionUrl) + '?regionHash=' + file.hash + '&token=' + getToken());
                console.log('ha?')
                //判断是否小文件  小于块当大小
                if (file.size < chunkSize) {
                    console.log('该是进来的啊')
                    // 打开文件
                    readFile(0, file.size, file, fd, true)

                    //否则则为大文件分块上传
                } else {

                    readFile(file.nowItem * chunkSize, chunkSize, file, fd, false);
                }
            }
            else {
                file.log = file.log + '\r\n 第一步请求分区域 url=' + checkUri + '参数=' + JSON.stringify(checkData);
                if (file.fileId) {
                    checkData.fileId = file.fileId;
                };
                if (fileModifyTimeFrom == 1) {
                    checkData.lastModifiedDate = file.mtime;
                };

                // ---------------- request.post ------- 异步 -----------------------
                //  自己起个方法名(checkUri, file)
            }
        });

    })
}

// 自己起个方法名( 这里参数传进来 )
function 自己起个方法名() {
    request.post({
        url: checkUri,
        formData: checkData,
        timeout: 60000,
        time: true
    }, function (err, resp, data) {
        let obj = null;
        //如果报错
        if (err) {
            file.log = file.log + '\r\n 错误信息:|' + checkData.fileName + '|   tranfer 1 get data server hash:    ' + err

            addSystemLog(file.log)

            file.upLoadStatus = 'error';
            file.errorMeg = lang.WEBSERVER_OUTTIME;
            file.tags = lang.WEBSERVER_OUTTIME;
            callBack({
                key: 'update',
                data: file
            });
            QueueLoad();
            resolve();
            // 此处 return; 换成上面的resolve
            // return; 
        }

        try {
            obj = JSON.parse(data);
        } catch (e) {
            let error = '\r\n错误信息:|' + checkData.fileName + '|    tranfer 1 get data server hash:   ' + data
            file.log = file.log + error
            addSystemLog(file.log)
            file.upLoadStatus = 'error';
            file.errorMeg = obj;
            file.tags = lang._root.error['ErrorCode1'];
            callBack({
                key: 'update',
                data: file
            });
            QueueLoad();
            resolve();
            // 此处 return; 换成上面的resolve
            // return; 
        }



        //判断是否错误
        if (obj.result && obj.result !== 0) {

            //是否同名
            if (obj.result == 610) {
                SameNameQueueHandler.add(file.key, file);
                QueueLoad();
                resolve();
                // 此处 return; 换成上面的resolve
                // return; 
            } else if (obj.result == 806) {

                // file.sameCode=806;
                // SameNameQueueHandler.add(file.key,file);
                //清理上传中队列和缓存
                // uploadsQueue.delete(file.uploadId);
                // edoc2upLoad.remove({key: file.uploadId});

                // callBack({
                //   key: 'update',
                //   data: file
                // })
                file.upLoadStatus = 'waiting';
                file.tags = lang.LOADING;
                uploadsQueue.set(file.uploadId, file);
                //  edoc2upLoad.update({key: file.uploadId}, {$set: {upLoadStatus: 'waiting'}});
                callBack({
                    key: 'update',
                    data: file
                });
                QueueLoad();

                // 函数执行结束，调用resolve
                resolve();
            } else {
                console.log('这里离？', obj)
                //   debugger
                let error = 'ErrorCode' + obj.result;
                let error2 = '\r\n错误信息:|' + checkData.fileName + '|    tranfer 1 get data server hash:|   ' + error + '------' + obj.reason
                file.log = file.log + error2
                addSystemLog(file.log)

                let errInfo = '';
                errInfo = lang._root.error[error] || lang._root.error['ErrorCode1'];
                file.upLoadStatus = 'error';
                file.errorMeg = obj.reason;
                file.tags = errInfo;
                callBack({
                    key: 'update',
                    data: file
                });

                fs.close(fd, function () {
                    console.log('上传出错已关闭文件', fd, file, file.parentId);
                });

                //再次继续队列下一个
                QueueLoad();
                // 函数执行结束，调用resolve
                resolve();
            }
        } else {
            let uri = '';
            let checkData = obj.data;
            if (checkData.RegionType === 1) {	// 主区域
                if (checkData.RegionUrl == "" || checkData.RegionUrl == null) {
                    uri = getApiUrl('upFile') + '?token=' + getToken() + '&regionHash=' + checkData.RegionHash;
                } else {
                    let str = checkData.RegionUrl
                    if (str.charAt(str.length - 1) === "/") {
                        uri = checkData.RegionUrl + 'document/upload?token=' + getToken() + '&regionHash=' + checkData.RegionHash;
                    } else {
                        uri = checkData.RegionUrl + '/document/upload?token=' + getToken() + '&regionHash=' + checkData.RegionHash;
                    }
                }
            } else { // 分区域
                uri = getApiUrl('upFile', checkData.RegionUrl) + '?regionHash=' + checkData.RegionHash + '&token=' + getToken()
                file.RegionUrl = checkData.RegionUrl
            }
            file.regionUrl = checkData.RegionUrl;
            file.uri = uri;
            file.hash = checkData.RegionHash;
            file.fileVersion = checkData.FileVerId;
            file.regionId = checkData.RegionId;
            //判断是否小文件  小于块当大小
            if (file.size <= chunkSize) {
                // 打开文件
                readFile(0, file.size, file, fd, true)
                //否则则为大文件分块上传
            } else {
                if (file.nowItem === file.maxItemLength - 1) {
                    readFile(file.nowItem * chunkSize, file.lastChunk, file, fd, false, true);
                } else {
                    readFile(file.nowItem * chunkSize, chunkSize, file, fd, false, true);
                }
            }
        }
    })
}
