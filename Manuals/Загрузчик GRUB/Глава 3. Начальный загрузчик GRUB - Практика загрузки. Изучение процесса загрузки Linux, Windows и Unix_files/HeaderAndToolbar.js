HeaderAndToolbar=  ''+
'<div id="header">'+ runningString +
'	<a onclick="_gaq.push([\'_trackEvent\', \'Header\', \'logo\', \'click\', 1]);" align="middle" target="_blank" href="http://www.mdl.ru">'+
'	<img src="/i/mdl-reg.jpg" style="position: relative; border-style: none; top: 18%;" alt="Перевод Mdl&reg;" width="40" height="14" align="middle"/></a>'+
'	<a onclick="_gaq.push([\'_trackEvent\', \'Header\', \'logo\', \'click\', 1]);" target="_blank" href="https://www.apress.com/gp/open-source">'+
'	<img src="/common/images/Apress-logo.jpg" alt="Hands- on Booting" width="146" height="42"/></a>'+
''+
'	<h1>'+HeaderName+'</h1>'+
'	<div id="navheader" align="right"><!----><table class="navLinks"><tr>'+
'		<td><a id="showHideButton" onclick="showHideToc(); _gaq.push([\'_trackEvent\', \'Header\', \'show/hide\', \'click\', 1]);" class="pointLeft" title="Скрыть дерево оглавления">Боковое поле</a>'+
'		</td><td><a accesskey="p" class="navLinkPrevious" onclick="_gaq.push([\'_trackEvent\', \'Header\', \'prevLink\', \'click\', 1]);" tabindex="5" href="'+PrevRef+'">Предыдущий</a> '+
'		  |'+
'       <a accesskey="u" class="navLinkUp" onclick="_gaq.push([\'_trackEvent\', \'Header\', \'upLink\', \'click\', 1]);" tabindex="5" href="'+UpRef+'">Вверх</a>'+
'		  |'+
'        <a accesskey="n" class="navLinkNext" onclick="_gaq.push([\'_trackEvent\', \'Header\', \'nextLink\', \'click\', 1]);" tabindex="5" href="'+NextRef+'">Следующий</a>'+
'		</td></tr></table>'+
'	</div>'+
'</div>'+
'<div id="toolbar" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">'+
'	<div id="toolbar-left">'+
'		<p class="breadcrumbs"><a href="'+ cloudcomputingURL +'">'+ cloudcomputingURLText +'</a>'+
'		<a href="http://onreader.mdl.ru/DistributedSystemsForPractitioners/content/index.html">Распределённые системы для практиков</a>'+
'		<a href="http://onreader.mdl.ru/RabbitMQEssentialsDistributedScalableApplications.2nd/content/index.html">Всё что требуется для RabbitMQ</a>'+
'		(<a onclick="_gaq.push([\'_trackEvent\', \'Header\', \'epubDownload\', \'click\', 1]);" alt="Загрузите ePub (рус.яз.)" class="epubicon" href="../ПрактикаЗагрузкиИзучениеПроцессаЗагрузкиLinux,WindowsиUnix.epub">'+
'		ePub</a> &nbsp; '+
'		<a onclick="_gaq.push([\'_trackEvent\', \'Header\', \'pdfDownload\', \'click\', 1]);" alt="Загрузите pdf (англ.яз.)" class="pdficon" href="https://www.apress.com/gb/book/9781484258897">'+
'		<img src="/common/images/pdf.png"/></a>) &nbsp; '+
'		</p>'+
'		<div id="gplusone">'+
'			<a id="AskMdl1" href="javascript:tocall()" onmouseover="this.href=mail" target="_blank" title="Вопросы? Обсудите их на mdl.ru">'+
'			<i class="icon-question"><!----></i></a>  '+
'			<a id="logABugLink1" href="javascript:tocall()" onmouseover="this.href=mail" title="Нашли ошибку? Сообщите о ней на данной странице">'+
'			<i class="icon-bug"><!----></i></a>'+
'		</div>'+
'	</div>'+
'</div>';
