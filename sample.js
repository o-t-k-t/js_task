"use strict";

// ブラウザでDOMの構築が完了後、ready引数で渡されたfunctionを実行する。
$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()),  // ID: national_languageが付与されたHTML要素のvalue属性の値を取得
                          Number($('#english').val()),            // 引数で何らかの型の値を、四則演算等が可能な整数型のオブジェクトに変関する
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    let sum = subject_points.reduce( function (acc, cur) { return acc + cur; }, 0);

    $("#sum_indicate").text(sum); // ID:sum_indicateが付与されたHTML要素のテキスト部を変数sumの内容に上書きする

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    let avr = sum / subject_points.length;
      
    $("#avarage_indicate").text(avr);
  };

  function get_achievement(){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let avr =  Number( $("#avarage_indicate").text() );
    let rank = "";
    
    if (avr >= 80) {
      rank = "A";
    } else if (avr >= 60) {
      rank ="B";
    } else if (avr >= 40) {
      rank = "C";
    } else {
      rank = "D";
    }
    
    $("#evaluation").text(rank);
  }

  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = [Number($('#national_language').val()),  // ID: national_languageが付与されたHTML要素のvalue属性の値を取得
                          Number($('#english').val()),            // 引数で何らかの型の値を、四則演算等が可能な整数型のオブジェクトに変関する
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    let result = subject_points.reduce( function (acc, cur) { return cur < 60 ? "不合格" : acc }, "合格");

    $("#judge").text(result);
  }

  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    let rank = $("#evaluation").text();
    let judge = $("#judge").text();;
    
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    $('#declaration').append(
      `<label id="alert-indicate" class="alert alert-info">あなたの成績は${rank}です。${judge}です</label>`);
    // ID: declarationが付与されたHTML要素のDOMの次の位置に、内容が<label ...info">のDOMを追加する
  };

  // IDでnational_language - societyのいずれかのIDが付与されたHTML要素のDOMに対し、マウスクリック時のハンドラとしてfunction内での記述の処理を登録する
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });

  // ID: btn-evaluationが付与されたHTML要素のDOMに対し、マウスクリック時のハンドラとしてfunction内での記述の処理を登録する
  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
});
// ここに書かれているjsの記述はあくまでヒントとして用意された雛形なので、書かれている記述に従わずに実装したいという場合は、自分の好きに実装して構わない。課題要件を満たし、コードの品質が一定の水準にあると判定されればどのような実装でも合格になる。
// 例ではJavaScriptとJqueryの両方の記述を使用しているが、どちらかに統一しても構わない
